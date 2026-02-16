"use client";

import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "../lib/firebase";
import { clearUserCookie, setUserCookie } from "../lib/cookies";
import { UserCookie } from "../types/type";
import { Button, message } from "antd";
import { AiFillGoogleCircle } from "react-icons/ai";
import { allowedEmails } from "../lib/auth";

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
        messageApi.error("Bạn không có quyền đăng nhập");
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
    <>
      {contextHolder}
      <div className="flex justify-center items-center min-h-screen bg-transparent px-10 sm:px-16 md:px-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-[40%]">
          <h2 className="text-3xl font-bold text-center text-black mb-4">
            ĐĂNG NHẬP
          </h2>
          <p className="text-gray-500 mb-6">
            Đây là trang đăng nhập chỉ dành cho Admin <br />
            Nếu bạn không phải Admin, hãy
            <a
              onClick={() => router.push("/")}
              className="font-bold text-blue-600 cursor-pointer hover:underline"
            >
              {" "}
              Quay lại trang chủ
            </a>
          </p>

          <Button
            type="primary"
            size="large"
            onClick={handLogin}
            loading={loading} // 🔥 loading state
            className="w-full text-white flex items-center justify-center gap-2"
          >
            {!loading && <AiFillGoogleCircle size={30} />}
            <span className="font-semibold">
              {loading ? "Đang đăng nhập..." : "Đăng nhập với Google"}
            </span>
          </Button>

          <p className="mt-4 text-sm text-center text-gray-400">
            © 2025 Panda Taekwondo
          </p>
        </div>
      </div>
    </>
  );
}
