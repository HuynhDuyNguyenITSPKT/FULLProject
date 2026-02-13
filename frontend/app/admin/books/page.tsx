"use client";

import { useEffect, useState } from "react";
import { getall } from "@/lib/book";
import Link from "next/link";

type Bookdetails = {
    id: number;
    title: string;
    author: string;
    coverImage: string;
    description: string;
};

export default function Books() {

    const [book, setBook] = useState<Bookdetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await getall();
            setBook(data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Books Admin Page</h1>

                <Link href="/admin/books/create">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        + Tạo sách
                    </button>
                </Link>
            </div>

            <table className="w-full border border-gray-200">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Title</th>
                    <th className="border p-2">Author</th>
                    <th className="border p-2">Action</th>
                </tr>
                </thead>

                <tbody>
                {book.map((b) => (
                    <>
                        <tr key={b.id} className="text-center">
                            <td className="border p-2">{b.id}</td>
                            <td className="border p-2">{b.title}</td>
                            <td className="border p-2">{b.author}</td>
                            <td className="border p-2 space-x-2">

                                {/* Nút chi tiết */}
                                <button
                                    onClick={() =>
                                        setSelectedId(
                                            selectedId === b.id ? null : b.id
                                        )
                                    }
                                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                                >
                                    {selectedId === b.id ? "Đóng" : "Chi tiết"}
                                </button>

                                {/* Nút sửa */}
                                <Link href={`/admin/books/edit/${b.id}`}>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                        Sửa
                                    </button>
                                </Link>

                                {/* Nút xóa */}
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Xóa
                                </button>

                                {/* Nút thêm chapter */}
                                <Link href={`/admin/books/${b.id}/add-chapter`}>
                                    <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600">
                                        Thêm Chapter
                                    </button>
                                </Link>

                            </td>
                        </tr>

                        {/* Phần hiển thị chi tiết */}
                        {selectedId === b.id && (
                            <tr>
                                <td colSpan={4} className="border p-4 bg-gray-50">
                                    <div className="flex gap-6">

                                        {b.coverImage && (
                                            <img
                                                src={b.coverImage}
                                                alt={b.title}
                                                className="w-32 rounded"
                                            />
                                        )}

                                        <div>
                                            <p><strong>Title:</strong> {b.title}</p>
                                            <p><strong>Author:</strong> {b.author}</p>
                                            <p className="mt-2">{b.description}</p>
                                        </div>

                                    </div>
                                </td>
                            </tr>
                        )}
                    </>
                ))}
                </tbody>
            </table>
        </div>
    );
}
