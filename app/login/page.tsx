"use client"

import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation"
import { auth, provider } from "../lib/firebase";
import { setUserCookie } from "../lib/cookies";
import { UserCookie } from "../types/type";


export default function LoginPage() {
    const router = useRouter();

    const handLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = {name: result.user.displayName, email: result.user.email};
            setUserCookie(user as UserCookie);

            const allowedEmail = ["nquy50771@gmail.com", "phanthanhnhanh2460@gmail.com"];
            if(allowedEmail.includes(user.email || "")) router.push("/admin");
            else { alert("Tài khoản này không có quyền truy cập admin!"); router.push("/"); }
        } catch (error) {
            console.error("Login failed", error);
        }
    }
    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <button
                onClick={handLogin} 
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >Login</button>
        </div>
    )
}