"use client"
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { getUserCookie } from "../lib/cookies";
import { useEffect, useState } from "react";


export default function Admin() {
    const router = useRouter();
    const [nameUser, setNameUser] = useState();
    
    useEffect(() => {
        let isMouted = true;
        const fetchData = async () => {
            try {
                const user = await getUserCookie();
                const allowedEmails = ["nquy50771@gmail.com", "phamthanhnhan2460@gmail.com"];
                if(isMouted) {
                    if (!user || !allowedEmails.includes(user.email)) router.push("/");
                    else setNameUser(user.name);
                }
                
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }
        fetchData();
        return () => { isMouted = false};
    }, [router]);
    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-[#e6f7fa] to-[#fff3f8]">
            <Navbar/>
            <div className="w-full h-full mt-[88px]"></div>
            <h1 className="text-3xl font-bold mb-4">Xin chào, {nameUser}</h1>
        </div>
    )
}