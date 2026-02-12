"use client";

import { useEffect, useState} from "react";
import { getall } from "@/lib/book"
import Link from "next/link";

type Bookdetails = {
    id: number,
    title: string,
    author: string,
    coverImage: string,
    description: string
}

export default function Books(){

    const [book, setBook] = useState<Bookdetails[]>([]);
    const [loading, setLoading] = useState(true);

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

                {/* Nút tạo mới */}
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
                    <tr key={b.id} className="text-center">
                        <td className="border p-2">{b.id}</td>
                        <td className="border p-2">{b.title}</td>
                        <td className="border p-2">{b.author}</td>
                        <td className="border p-2 space-x-2">
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
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

}