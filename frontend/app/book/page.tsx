"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getall } from "@/lib/book"; // sửa lại đúng path của bạn

type Comic = {
    id: number;
    title: string;
    author: string;
    coverImage: string;
};

export default function BookPage() {
    const [books, setBooks] = useState<Comic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getall();
                setBooks(data);
            } catch (error) {
                console.error("Lỗi lấy dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Đang tải sách...</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-zinc-100"
                >
                    <Link href={`/book/${book.id}`}>
                        <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-64 object-cover"/>
                    </Link>


                    <div className="p-4">
                        <h3 className="font-semibold text-lg line-clamp-2">
                            {book.title}
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1">
                            {book.author}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
