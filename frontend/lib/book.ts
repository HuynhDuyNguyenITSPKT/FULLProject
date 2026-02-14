import { apiFetch } from "@/lib/api";

export async function getall(){
    const data = await apiFetch("/api/comics/all", {
        method: "GET",
    });
    return data.data;
}

export async function getBookById(id: number) {
    const data = await apiFetch(`/api/comics/${id}`, {
        method: "GET",
    });
    return data.data;
}

export async function GetChaptersByComicId(comicId: number,ChapterNumber: number) {
    const data = await apiFetch(`/api/comics/${comicId}/${ChapterNumber}`, {
        method: "GET",
    });
    return data.data;
}

export async function increasecomics(id: number) {
    const data = await apiFetch(`/api/comics/viewcomic/${id}`, {
        method: "GET",
    });
    return data.data;
}

export async function hotcomics(limit: number) {
    const data = await apiFetch(`/api/comics/top/viewWeek?limit=${limit}`, {
        method: "GET",
    });
    return data.data;
}