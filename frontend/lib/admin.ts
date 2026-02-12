import {apiFetch} from "@/lib/api";

export async function getUserInfo() {
    const data = await apiFetch("/api/admin/users/all", {
        method: "GET",
    });
    return data.data.users;
}

export async function createcomics(title: string, author: string, description: string, coverImage: string) {
    const data = await apiFetch("/api/admin/comics/create", {
        method: "POST",
        body: JSON.stringify({ title, author, description, coverImage }),
    });
    return data.data;
}

export async function updatecomics(id: number, title: string, author: string, description: string, coverImage: string) {
    const data = await apiFetch(`/api/admin/comics/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, author, description, coverImage }),
    });
    return data.data;
}

