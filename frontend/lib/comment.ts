import { apiFetch } from "./api";

export async function postComment(
  username: string,
  idchapter: number,
  content: string
) {
  const data = await apiFetch(
    `/api/comments/add?username=${username}&idchapter=${idchapter}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }), 
    }
  );

  return data.data;
}

export async function getCommentsByChapterId(idchapter: number) {
    const data = await apiFetch(`/api/comments/list?chapterId=${idchapter}`, {
        method: "GET",
    });

    return data.data;
}
