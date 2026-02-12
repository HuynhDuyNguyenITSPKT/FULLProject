"use client";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/lib/admin";

type User = {
    id: number;
    username: string;
    role: string;
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUserInfo();
            setUsers(data);
        } catch (error) {
            console.error("Lỗi load user:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-6">Đang tải...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Danh sách User</h1>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 shadow rounded-lg">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">ID</th>
                        <th className="p-3 border">Username</th>
                        <th className="p-3 border">Role</th>
                        <th className="p-3 border text-center">Hành động</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-center hover:bg-gray-50">
                            <td className="p-3 border">{user.id}</td>
                            <td className="p-3 border">{user.username}</td>
                            <td className="p-3 border">{user.role}</td>
                            <td className="p-3 border space-x-2">
                                <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded"
                                    onClick={() => alert("Chưa có chức năng sửa")}
                                >
                                    Sửa
                                </button>

                                <button
                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                    onClick={() => alert("Chưa có chức năng xóa")}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <div className="text-center p-6 text-gray-500">
                        Không có user nào
                    </div>
                )}
            </div>
        </div>
    );
}
