// lib/auth.ts
import { apiFetch } from "./api";

const ACCESS_TOKEN_KEY = "access_token";

export function setAccessToken(token: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
}

export function getAccessToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return null;
}

export function removeAccessToken() {
    if (typeof window !== "undefined") {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
}

export async function login(username: string, password: string) {
    const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });

    setAccessToken(data.data);
}

export async function register(username: string, password: string) {
    await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
}

export async function logout() {
    await apiFetch("/api/auth/logout", {
        method: "POST",
    });
    removeAccessToken();
}

export async function me() {
    const data = await apiFetch("/api/auth/me", {
        method: "GET",
    });
    return data.data;
}
