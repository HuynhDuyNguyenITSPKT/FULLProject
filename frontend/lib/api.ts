import { getAccessToken, setAccessToken, removeAccessToken } from "./auth";

export const API_URL = "http://localhost:8080";

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token = getAccessToken();

    const headers: any = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include", // gửi refresh cookie
        headers,
    });

    // Nếu hết hạn access token → thử refresh
    if (res.status === 401) {
        const refreshed = await tryRefreshToken();

        if (refreshed) {
            const newToken = getAccessToken();

            const retryHeaders: any = {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            };

            if (newToken) {
                retryHeaders["Authorization"] = `Bearer ${newToken}`;
            }

            const retryRes = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                credentials: "include",
                headers: retryHeaders,
            });

            if (!retryRes.ok) {
                removeAccessToken();
                throw new Error("Unauthorized");
            }

            return retryRes.json();
        }

        removeAccessToken();
        throw new Error("Unauthorized");
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}


async function tryRefreshToken() {
    try {
        const res = await fetch(`${API_URL}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) return false;

        const data = await res.json();

        setAccessToken(data.data);

        return true;
    } catch {
        return false;
    }
}