"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getUserCookie } from "../lib/cookies";
import { allowedEmails } from "../lib/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [nameUser, setNameUser] = useState<string | undefined>("");

  useEffect(() => {
    let isMouted = true;
    const fetchData = async () => {
      try {
        const user = await getUserCookie();
        if (isMouted) {
          if (!user || !allowedEmails.includes(user.email)) router.push("/");
          else setNameUser(user.name);
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };
    fetchData();
    return () => {
      isMouted = false;
    };
  }, [router]);
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="w-full h-full px-10 sm:px-16 md:px-20 py-5 lg:py-10 mt-[88px]">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          Xin chào, {nameUser}
        </h2>
      </div>
    </div>
  );
}
