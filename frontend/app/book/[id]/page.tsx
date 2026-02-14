"use client";

import { useEffect, useState , useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getBookById, getall , increasecomics} from "@/lib/book";

type Chapter = {
    id: number;
    title: string;
    chapterNumber: number;
};

type Book = {
    id: number;
    title: string;
    description: string;
    author: string;
    coverImage: string;
};

export default function BookDetailPage() {
    const params = useParams();
    const id = Number(params.id);
    const hasIncreased = useRef(false);

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [book, setBook] = useState<Book | null>(null);
    const [loadingChapters, setLoadingChapters] = useState(true);
    const [loadingBook, setLoadingBook] = useState(true);

    useEffect(() => {
        if (isNaN(id)) return;

        const fetchChapters = async () => {
            try {
                const data = await getBookById(id);
                setChapters(data);
            } catch (error) {
                console.error("Lỗi lấy chương:", error);
            } finally {
                setLoadingChapters(false);
            }
        };

        const fetchBook = async () => {
            try {
                const data = await getall();
                const foundBook = data.find((b: Book) => b.id === id);
                setBook(foundBook || null);
            } catch (error) {
                console.error("Lỗi lấy sách:", error);
            } finally {
                setLoadingBook(false);
            }
        };


        const handleIncreaseView = async () => {
            if (hasIncreased.current) return;
            hasIncreased.current = true;
            const view = `comic_view_${id}`;

            if (!localStorage.getItem(view)) {
                try {
                    const dataview = await increasecomics(id);
                    console.log("Đã gửi request tăng view");
                    if (dataview) {
                        localStorage.setItem(view, "viewed");
                    }
                } catch (error) {
                    console.error("Lỗi tăng view:", error);
                }
            }
        };
        handleIncreaseView();
        fetchChapters();
        fetchBook();
    }, [id]);

    if (loadingBook || loadingChapters) {
        return (
            <div className="text-center py-20 text-lg">
                Đang tải dữ liệu...
            </div>
        );
    }

    if (!book) {
        return (
            <div className="text-center py-20 text-red-500">
                Không tìm thấy sách
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">

            {/* Thông tin sách */}
            <div className="flex gap-6 mb-10">
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-40 h-60 object-cover rounded-xl shadow-md"
                />

                <div>
                    <h1 className="text-3xl font-bold mb-3">
                        {book.title}
                    </h1>

                    <p className="text-zinc-600 mb-2">
                        Tác giả: {book.author}
                    </p>

                    <p className="text-zinc-700">
                        {book.description}
                    </p>
                </div>
            </div>

            {/* Danh sách chương */}
            <h2 className="text-2xl font-semibold mb-6">
                Danh sách chương
            </h2>

            <div className="space-y-4">
                {chapters.length === 0 ? (
                    <p className="text-zinc-500">
                        Chưa có chương nào
                    </p>
                ) : (
                    chapters.map((chapter) => (
                        <Link
                            key={chapter.id}
                            href={`/book/${id}/chapter/${chapter.chapterNumber}`}
                        >
                            <div className="p-4 border rounded-xl hover:bg-zinc-50 transition cursor-pointer">
                                <p className="font-semibold">
                                    Chapter {chapter.chapterNumber}
                                </p>
                                <p className="text-zinc-600">
                                    {chapter.title}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
