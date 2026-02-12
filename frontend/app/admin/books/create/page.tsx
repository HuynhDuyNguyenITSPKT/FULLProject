"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createcomics } from "@/lib/admin";

export default function CreateBookPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createcomics(title, author, description, coverImageUrl);
            alert("Tạo sách thành công");
            router.push("/admin/books");
        } catch (error) {
            console.error(error);
            alert("Tạo sách thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Tạo sách mới</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Author"
                    className="w-full border p-2 rounded"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Cover Image URL"
                    className="w-full border p-2 rounded"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    {loading ? "Đang tạo..." : "Tạo sách"}
                </button>
            </form>
        </div>
    );
}
