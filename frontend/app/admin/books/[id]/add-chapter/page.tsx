"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addchapter } from "@/lib/admin";

export default function AddChapterPage() {

    const params = useParams();
    const router = useRouter();
    const comicId = Number(params.id);

    const [chapterNumber, setChapterNumber] = useState<number>(1);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !content) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        try {
            setLoading(true);

            await addchapter(comicId, chapterNumber, title, content);

            alert("Thêm chapter thành công!");
            router.push("/admin/books");

        } catch (error) {
            console.log(error);
            alert("Có lỗi xảy ra!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">

            <h1 className="text-2xl font-bold mb-6">
                Thêm Chapter cho Comic ID: {comicId}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                <input
                    type="number"
                    placeholder="Chapter Number"
                    value={chapterNumber}
                    onChange={(e) => setChapterNumber(Number(e.target.value))}
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Chapter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                />

                <textarea
                    placeholder="Chapter Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {loading ? "Đang thêm..." : "Thêm Chapter"}
                </button>

            </form>
        </div>
    );
}
