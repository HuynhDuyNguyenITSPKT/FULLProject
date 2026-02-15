"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { GetChaptersByComicId } from "@/lib/book";
import { getCommentsByChapterId, postComment } from "@/lib/comment";
import { me } from "@/lib/auth";

type Comic = {
  id: number;
  title: string;
  chapterNumber: number;
  content: string;
};

type Comment = {
  id: number;
  chapterId: number;
  username: string;
  content: string;
  createdAt: string;
};

export default function ChapterPage() {
  const params = useParams();

  const bookId = Number(params.id);
  const chapterNumber = Number(params.chapterNumber);

  const [chapter, setChapter] = useState<Comic | null>(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);

  // 👇 số comment đang hiển thị
  const [visibleCount, setVisibleCount] = useState(5);

  // ===== FETCH CHAPTER =====
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        if (isNaN(bookId) || isNaN(chapterNumber)) {
          setLoading(false);
          return;
        }

        const data = await GetChaptersByComicId(bookId, chapterNumber);
        setChapter(data);
      } catch (error) {
        console.error("Lỗi lấy chapter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [bookId, chapterNumber]);

  // ===== FETCH COMMENTS =====
  useEffect(() => {
    if (!chapter) return;

    const fetchComments = async () => {
      try {
        const data = await getCommentsByChapterId(chapter.id);
        setComments(data);
        setVisibleCount(5); // reset khi đổi chapter
      } catch (error) {
        console.error("Lỗi lấy bình luận:", error);
      }
    };

    fetchComments();
  }, [chapter]);

  // ===== SORT COMMENT MỚI NHẤT =====
  const sortedComments = useMemo(() => {
    return [...comments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }, [comments]);

  // ===== POST COMMENT =====
  const handlePostComment = async () => {
    if (!newComment.trim() || !chapter) return;

    try {
      setPosting(true);

      const user = await me();
      if (!user) {
        alert("Bạn cần đăng nhập để bình luận");
        return;
      }

      const username = user.username;

      await postComment(username, chapter.id, newComment);

      const data = await getCommentsByChapterId(chapter.id);
      setComments(data);

      setNewComment("");
      setVisibleCount(5); // reset về 5 sau khi gửi
    } catch (error) {
      console.error("Lỗi gửi comment:", error);
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Đang tải chương...</div>;
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

      {/* ===== NAVIGATION ===== */}
      <div className="flex justify-between mt-12 mb-16">
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

      {/* ===== COMMENT SECTION ===== */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Bình luận</h2>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Nhập bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePostComment}
            disabled={posting}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {posting ? "Đang gửi..." : "Gửi"}
          </button>
        </div>

        <div className="space-y-4">
          {sortedComments.length === 0 ? (
            <p className="text-zinc-500">Chưa có bình luận nào</p>
          ) : (
            <>
              {sortedComments
                .slice(0, visibleCount)
                .map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 border rounded-xl bg-zinc-50"
                  >
                    <p className="font-semibold text-sm text-blue-600">
                      {comment.username}
                    </p>
                    <p className="text-zinc-700">
                      {comment.content}
                    </p>
                    <p className="text-xs text-zinc-400 mt-2">
                      {new Date(
                        comment.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}

              {/* ===== XEM THÊM / THU GỌN ===== */}
              {sortedComments.length > 5 && (
                <div className="text-center mt-4">
                  {visibleCount < sortedComments.length ? (
                    <button
                      onClick={() =>
                        setVisibleCount((prev) => prev + 5)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Xem thêm
                    </button>
                  ) : (
                    <button
                      onClick={() => setVisibleCount(5)}
                      className="text-blue-600 hover:underline"
                    >
                      Thu gọn
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
