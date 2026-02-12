"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { GetChaptersByComicId } from "@/lib/book";

type Comic = {
    id: number;
    title: string;
    chapterNumber: number;
    content: string;
};

export default function ChapterPage() {
    const params = useParams();

    const bookId = Number(params.id);
    const chapterNumber = Number(params.chapterNumber);
    console.log("params:", params);
    console.log("bookId:", bookId);
    console.log("chapterNumber:", chapterNumber);
    const [chapter, setChapter] = useState<Comic | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                if (isNaN(bookId) || isNaN(chapterNumber)) {
                    setLoading(false);
                    return;
                }

                const data = await GetChaptersByComicId(
                    bookId,
                    chapterNumber
                );

                setChapter(data);
            } catch (error) {
                console.error("Lỗi lấy chapter:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChapter();
    }, [bookId, chapterNumber]);

    if (loading) {
        return (
            <div className="text-center py-20">
                Đang tải chương...
            </div>
        );
    }

    if (!chapter) {
        return (
            <div className="text-center py-20 text-red-500">
                Không tìm thấy chương
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-3xl font-bold text-center mb-2">
                {chapter.title}
            </h1>

            <p className="text-center text-zinc-500 mb-8">
                Chapter {chapter.chapterNumber}
            </p>

            <div className="whitespace-pre-line leading-relaxed text-lg">
                {chapter.content}
            </div>

            <div className="flex justify-between mt-12">

                {chapter.chapterNumber > 1 ? (
                    <Link
                        href={`/book/${bookId}/chapter/${chapter.chapterNumber - 1}`}
                        className="px-4 py-2 bg-zinc-200 rounded-lg hover:bg-zinc-300"
                    >
                        ← Chương trước
                    </Link>
                ) : (
                    <div />
                )}

                <Link
                    href={`/book/${bookId}`}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                    Danh sách chương
                </Link>

                <Link
                    href={`/book/${bookId}/chapter/${chapter.chapterNumber + 1}`}
                    className="px-4 py-2 bg-zinc-200 rounded-lg hover:bg-zinc-300"
                >
                    Chương sau →
                </Link>
            </div>
        </div>
    );
}
