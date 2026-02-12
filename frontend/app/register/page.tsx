"use client";

import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();

        try {
            await register(username, password);
            router.push("/login");
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Something went wrong");
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleRegister}
                className="w-96 p-8 bg-white shadow rounded-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

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
                    Đăng ký
                </button>
            </form>
        </div>
    );
}