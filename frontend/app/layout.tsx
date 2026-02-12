import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
    title: "HDN Books",
    description: "Nền tảng đọc sách online hiện đại",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
        <body className="min-h-screen flex flex-col bg-white text-zinc-900">

        <AuthProvider>
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-12">
                {children}
            </main>
        </AuthProvider>

        <footer className="border-t border-zinc-200">
            <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-zinc-500">
                © 2026 HDN Books. All rights reserved.
            </div>
        </footer>

        </body>
        </html>
    );
}
