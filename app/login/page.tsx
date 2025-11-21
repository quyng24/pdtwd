"use client"

import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation"
import { auth, provider } from "../lib/firebase";
import { setUserCookie } from "../lib/cookies";
import { UserCookie } from "../types/type";
import {Button, message} from "antd"
import { AiFillGoogleCircle } from "react-icons/ai"


export default function LoginPage() {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
        type: 'success',
        content: 'Đăng nhập thành công',
        });
    };

    const error = () => {
        messageApi.open({
        type: 'error',
        content: 'Bạn không có quyền đang nhập',
        });
    };
    const handLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = {name: result.user.displayName, email: result.user.email};
            setUserCookie(user as UserCookie);

            const allowedEmail = ["nquy50771@gmail.com", "phanthanhnhanh2460@gmail.com"];
            if(allowedEmail.includes(user.email || "")) {
                success()
                router.push("/admin")
            }
            else { 
                error()
                router.push("/"); 
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    }
    return (
        <>
            {contextHolder}
            <div className="flex justify-center items-center min-h-screen bg-transparent px-10 sm:px-16 md:px-20">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-[40%]">
                    <h2 className="text-3xl font-bold text-center text-black mb-4">ĐĂNG NHẬP</h2>
                    <p className="text-gray-500 mb-6">Đây là trang đăng nhập chỉ dành cho Admin <br /> Nếu bạn không phải Admin, hãy 
                        <a onClick={() => router.push("/")} className="font-bold text-blue-600 no-underline hover:underline cursor-pointer"> Quay lại trang chủ</a>.
                    </p>

                    <Button
                        type="primary"
                        size="large"
                        onClick={handLogin}
                        className="w-full text-white"
                    >
                        <AiFillGoogleCircle size={30}/>
                        <span className="font-semibold">Đăng nhập với Google</span>
                    </Button>

                    <p className="mt-4 text-sm text-center text-gray-400">© 2025 Panda Taekwondo</p>
                </div>
            </div>
        </>
    )
}