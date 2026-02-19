"use client";

import { useState } from "react";
import { Button, message } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signInWithPopup, signOut } from "firebase/auth";

import { LuShieldAlert, LuArrowLeft } from "react-icons/lu";
import { AiFillGoogleCircle } from "react-icons/ai";

import { auth, provider } from "@/lib/firebase";
import { clearUserCookie, setUserCookie } from "@/lib/cookies";
import { UserCookie } from "@/types/type";
import { allowedEmails } from "@/lib/auth";


export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            const user = { name: result.user.displayName, email: result.user.email };

            if (allowedEmails.includes(user.email || "")) {
                messageApi.success("Đăng nhập thành công");
                await setUserCookie(user as UserCookie);
                router.replace("/dashboard");
                router.refresh();
            } else {
                await clearUserCookie();
                await signOut(auth);
                messageApi.error("Bạn không có quyền truy cập hệ thống");
                router.replace("/");
            }
        } catch (error) {
            messageApi.error("Đăng nhập thất bại");
            console.error("Login failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {contextHolder}

            {/* 1. BACKGROUND LAYER */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/mau-trang.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-30 grayscale-50"
                />
                <div className="absolute inset-0 bg-linear-to-br from-black via-black/80 to-blue-900/20" />
            </div>

            {/* 2. LOGIN CARD (Glassmorphism) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-112.5 px-6"
            >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">

                    {/* Logo & Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.4)] rotate-3 hover:rotate-0 transition-transform duration-300">
                            <LuShieldAlert className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                            Admin Portal
                        </h2>
                        <div className="h-1 w-12 bg-blue-600 mt-2 rounded-full" />
                    </div>

                    <p className="text-gray-400 text-center text-sm leading-relaxed mb-8">
                        Hệ thống quản trị nội dung dành riêng cho <span className="text-blue-400 font-semibold">Panda Taekwondo</span>. Vui lòng xác thực quyền truy cập.
                    </p>

                    {/* Login Button */}
                    <div className="space-y-4">
                        <Button
                            type="primary"
                            size="large"
                            onClick={handLogin}
                            loading={loading}
                            className="w-full h-14 bg-white! text-black! border-none rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02]! active:scale-95! shadow-xl"
                        >
                            {!loading && <AiFillGoogleCircle size={24} className="text-red-500" />}
                            <span className="font-bold uppercase tracking-wider text-xs">
                                {loading ? "Đang xác thực..." : "Tiếp tục với Google"}
                            </span>
                        </Button>

                        <button
                            onClick={() => router.push("/")}
                            className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-semibold py-2"
                        >
                            <LuArrowLeft size={14} /> Quay lại trang chủ
                        </button>
                    </div>

                    {/* Decorative Security Line */}
                    <div className="mt-10 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">Secure Access</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-8 text-[10px] text-center text-gray-600 uppercase tracking-widest font-medium">
                    © 2026 Panda Taekwondo • Management System v2.0
                </p>
            </motion.div>

            {/* 3. LIGHT EFFECTS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
    );
}