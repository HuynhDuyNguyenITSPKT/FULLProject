"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updatecomics } from "@/lib/admin";
import { getall } from "@/lib/book";

type Bookdetails = {
    id: number;
    title: string;
    author: string;
    coverImage: string;
    description: string;
};

export default function EditBookPage() {
    const params = useParams();
    const router = useRouter();
    const id = Number(params.id);

    const [book, setBook] = useState<Bookdetails | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getall();
                const found = data.find((b: Bookdetails) => b.id === id);
                if (found) setBook(found);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const handleUpdate = async () => {
        if (!book) return;

        try {
            await updatecomics(
                id,
                book.title,
                book.author,
                book.description,
                book.coverImage
            );

            alert("Cập nhật thành công!");
            router.push("/admin/books");
        } catch (error) {
            console.log(error);
            alert("Cập nhật thất bại!");
        }
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Chỉnh sửa sách</h1>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={book.title}
                    onChange={(e) =>
                        setBook({ ...book, title: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Author"
                    value={book.author}
                    onChange={(e) =>
                        setBook({ ...book, author: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={book.coverImage}
                    onChange={(e) =>
                        setBook({ ...book, coverImage: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />

                <textarea
                    placeholder="Description"
                    value={book.description}
                    onChange={(e) =>
                        setBook({ ...book, description: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                />

                <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                >
                    Cập nhật
                </button>
            </div>
        </div>
    );
}