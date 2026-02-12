import Link from "next/link";

export default function Home() {
    return (
        <div>

            {/* Hero Section */}
            <section className="flex flex-col items-center text-center py-24">

                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    Nền tảng đọc sách online
                    <span className="block text-indigo-600">
                        hiện đại & tiện lợi
                    </span>
                </h2>

                <p className="max-w-2xl text-lg text-zinc-700 mb-10">
                    Khám phá hàng nghìn đầu sách đa dạng thể loại: truyện tranh,
                    tiểu thuyết, kỹ năng sống, công nghệ và nhiều hơn nữa.
                </p>

                <div className="flex gap-4">
                    <Link
                        href="/register"
                        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
                    >
                        Bắt đầu miễn phí
                    </Link>

                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 transition"
                    >
                        Khám phá ngay
                    </Link>
                </div>
            </section>

            {/* Feature Section */}
            <section className="grid md:grid-cols-3 gap-8 py-16">

                <div className="p-8 rounded-2xl bg-white shadow-sm border border-zinc-200">
                    <h3 className="text-xl font-semibold mb-3">
                        📖 Kho sách đa dạng
                    </h3>
                    <p className="text-zinc-700">
                        Hàng nghìn đầu sách được cập nhật liên tục từ nhiều thể loại khác nhau.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-white shadow-sm border border-zinc-200">
                    <h3 className="text-xl font-semibold mb-3">
                        ⚡ Trải nghiệm nhanh
                    </h3>
                    <p className="text-zinc-700">
                        Tốc độ tải nhanh, giao diện tối giản, tối ưu cho mọi thiết bị.
                    </p>
                </div>

                <div className="p-8 rounded-2xl bg-white shadow-sm border border-zinc-200">
                    <h3 className="text-xl font-semibold mb-3">
                        🔒 Bảo mật an toàn
                    </h3>
                    <p className="text-zinc-700">
                        Hệ thống xác thực và bảo mật hiện đại giúp bảo vệ tài khoản người dùng.
                    </p>
                </div>

            </section>

        </div>
    );
}
