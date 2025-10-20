"use client"
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { getUserCookie } from "../lib/cookies";
import { useEffect } from "react";


export default function Admin() {
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserCookie();
            const allowedEmails = ["nquy50771@gmail.com", "phanthanhnhanh2460@gmail.com"];
            if (!user || !allowedEmails.includes(user.email)) router.push("/");
        }
        fetchData();
    }, [router]);
    return (
        <div className="w-full min-h-screen">
            <Navbar/>
            <div className="w-full h-full mt-[88px]"></div>
            <h1 className="text-3xl font-bold mb-4">Trang Admin</h1>
            <p>Xin chào</p>
        </div>
    )
}