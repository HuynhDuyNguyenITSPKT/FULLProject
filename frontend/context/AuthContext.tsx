"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { me, logout } from "@/lib/auth";

type User = {
    username: string;
    authorities: { authority: string }[];
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
                                 children,
                             }: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function refreshUser() {
        try {
            const data = await me();
            setUser(data);
        } catch (error) {
            setUser(null);
        }
    }

    async function handleLogout() {
        await logout();
        setUser(null);
    }

    useEffect(() => {
        const init = async () => {
            try {
                await refreshUser();
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, loading, refreshUser, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}
