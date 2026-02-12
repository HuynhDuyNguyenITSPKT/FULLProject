"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const { user, handleLogout } = useAuth();

    const isAdmin =
        user?.authorities?.some(
            (a) => a.authority === "ROLE_ADMIN"
        );

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                {/* Left */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tight"
                    >
                        📚 HDN Books
                    </Link>

                    {user && !isAdmin && (
                        <Link
                            href="/book"
                            className="text-lg font-semibold"
                        >
                            Thư viện sách
                        </Link>
                    )}

                    {isAdmin && (
                        <>
                            <Link
                                href="/admin/users"
                                className="text-lg font-semibold"
                            >
                                Users
                            </Link>

                            <Link
                                href="/admin/books"
                                className="text-lg font-semibold"
                            >
                                Books
                            </Link>
                        </>
                    )}
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    {!user ? (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 border rounded-xl"
                            >
                                Đăng nhập
                            </Link>

                            <Link
                                href="/register"
                                className="px-5 py-2 bg-indigo-600 text-white rounded-xl"
                            >
                                Đăng ký
                            </Link>
                        </>
                    ) : (
                        <>
            <span className="text-sm">
                Xin chào, {user.username}
            </span>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-black text-white rounded-xl"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
