"use client"
import Link from "next/link";
import { clearUserCookie, getUserCookie } from "../lib/cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserCookie } from "../types/type";
export default function Navbar() {
  const [user, setUser] = useState<UserCookie | null>(null);
  const router = useRouter();

  useEffect(() => {
        const fetchData = async () => {
            const user = await getUserCookie();
            setUser(user);
        }
        fetchData();
    }, []);
  return (
    <>
      { user ? (
        <nav className="fixed top-0 w-full bg-white shadow z-50 min-h-[88px] ">
          <h2>Admin</h2>
          <button onClick={() => { clearUserCookie(); router.push("/"); }}>Logout</button>
        </nav>
      ) : (
        <nav className="fixed top-0 w-full bg-white shadow z-50">
          <ul className="flex justify-center space-x-6 p-4">
            <li className="hover:text-blue-600 duration-300"><a href="#hero" className="hover-underline text-2xl font-semibold">Trang chủ</a></li>
            <li className="hover:text-blue-600 duration-300"><a href="#about" className="hover-underline text-2xl font-semibold">Giới thiệu</a></li>
            <li className="hover:text-blue-600 duration-300"><a href="#contact" className="hover-underline text-2xl font-semibold">Liên hệ</a></li>
          </ul>
          <Link href="/login">Login Admin</Link>
        </nav>
      )}
    </>
  );
}
