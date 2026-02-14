"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getall, hotcomics } from "@/lib/book";

type Comic = {
    id: number;
    title: string;
    author: string;
    coverImage: string;
    lastWeekViews: number;
    viewsCount: number;
};

export default function BookPage() {
    const [books, setBooks] = useState<Comic[]>([]);
    const [hotBooks, setHotBooks] = useState<Comic[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const booksPerPage = 8;

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

        const fetchHotBooks = async () => {
            try {
                const data = await hotcomics(6);
                setHotBooks(data);
            } catch (error) {
                console.error("Lỗi lấy hot comics:", error);
            }
        };

        

        fetchData();
        fetchHotBooks();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Đang tải sách...</div>;
    }

    // ===== SEARCH LOGIC =====
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ===== PAGINATION LOGIC =====
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    return (
        <div className="space-y-12">

            {/* ===== HOT COMICS ===== */}
            <div>
                <h2 className="text-2xl font-bold mb-4">🔥 Truyện Hot</h2>
                <div className="flex gap-6 overflow-x-auto pb-4">
                    {hotBooks.map((book) => (
                        <Link key={book.id} href={`/book/${book.id}`}>
                            <div className="min-w-[180px] bg-white rounded-xl shadow hover:shadow-lg transition">
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="w-full h-56 object-cover rounded-t-xl"
                                />
                                <div className="p-3">
                                    <p className="font-semibold line-clamp-2 text-sm">
                                        {book.title}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ===== ALL BOOKS ===== */}
            <div>

                {/* SEARCH BAR */}
                <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
                    <h2 className="text-2xl font-bold">📚 Tất cả truyện</h2>

                    <input
                        type="text"
                        placeholder="Tìm theo tên truyện..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {currentBooks.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-zinc-100"
                        >
                            <Link href={`/book/${book.id}`}>
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="w-full h-64 object-cover"
                                />
                            </Link>

                            <div className="p-4">
                                <h3 className="font-semibold text-lg line-clamp-2">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-zinc-500 mt-1">
                                    {book.author}
                                </p>
                                <p className="text-sm text-zinc-500 mt-1">
                                    Tổng lượt xem: {book.viewsCount}
                                </p>
                                <p className="text-sm text-zinc-500 mt-1">
                                    Lượt xem tuần: {book.lastWeekViews}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10 gap-2 flex-wrap">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-4 py-2 rounded-lg border ${
                                    currentPage === index + 1
                                        ? "bg-black text-white"
                                        : "bg-white"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
