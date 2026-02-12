"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { refreshUser } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        try {
            await login(username, password);

            await refreshUser(); // cập nhật user vào context

            router.push("/");
        } catch (err) {
            alert("Login failed");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleLogin}
                className="w-96 p-8 bg-white shadow rounded-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Đăng nhập
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full mb-4 p-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full bg-black text-white py-2 rounded">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}
