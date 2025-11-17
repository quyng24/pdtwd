"use client"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clearUserCookie, getUserCookie } from "../lib/cookies";
import { UserCookie } from "../types/type";
import Logo from "@/app/images/logo-primary.png";

export default function Navbar() {
  const [user, setUser] = useState<UserCookie | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserCookie();
      setUser(user);
    }
    fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (menuRef.current && target instanceof Node && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      {user ? (
        <nav className="fixed top-0 w-full bg-white shadow z-50 min-h-[88px] flex items-center justify-between px-5 sm:px-10 md:px-20">
          <Image src={Logo} alt="Logo" className="remove-bg w-[50%] sm:w-[30%] md:w-[20%]" />
          <button 
            onClick={() => { clearUserCookie(); router.push("/"); }}
            className="pt-3 pb-3 pl-5 pr-5 rounded-lg text-base font-semibold border-[2px] border-blue-200 text-blue-500"
          >Logout</button>
        </nav>
      ) : (
        <nav className="fixed w-screen flex items-center justify-between top-0 bg-white shadow z-50 px-5 sm:px-10 md:px-20">
          <a href="#hero" className="w-[50%] sm:w-[30%] md:w-[20%]"><Image src={Logo} alt="Logo" className="remove-bg" /></a>
          
          {/* Menu - Desktop and Tablet */}
          <ul className="hidden sm:flex justify-center gap-4 space-x-6 p-4 flex-1">
            <li className="hover:text-blue-600 duration-300">
              <a href="#introduce" className="hover-underline text-2xl font-semibold">Giới thiệu</a>
            </li>
            <li className="hover:text-blue-600 duration-300">
              <a href="#work" className="hover-underline text-2xl font-semibold">Hoạt động của lớp</a>
            </li>
            <li className="hover:text-blue-600 duration-300">
              <a href="#register" className="hover-underline text-2xl font-semibold">Đăng ký học</a>
            </li>
          </ul>
          
          {/* Login Link */}
          <Link 
            href="/login" 
            className="sm:py-1 sm:px-3 md:py-3 md:px-5 rounded-lg sm:text-xs md:text-base sm:font-light md:font-semibold border-[2px] border-blue-200 text-blue-500 hidden sm:block"
          >
            Login Admin
          </Link>

          {/* Mobile Hamburger Menu */}
          <div className="sm:hidden flex items-center">
            <button
              className="text-blue-500 p-3 rounded-md focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {/* Hamburger Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </nav>
      )}

      {menuOpen && (
        <div ref={menuRef} className="sm:hidden fixed top-0 left-0 w-full bg-white z-40 shadow-lg py-3">
          <ul className="flex flex-col items-center justify-center space-y-6 pt-20">
            <li className="hover:text-blue-600 duration-300">
              <a href="#introduce" className="hover-underline text-2xl font-semibold" onClick={closeMenu}>Giới thiệu</a>
              </li>
            <li className="hover:text-blue-600 duration-300">
              <a href="#work" className="hover-underline text-2xl font-semibold" onClick={closeMenu}>Hoạt động của lớp</a>
            </li>
            <li className="hover:text-blue-600 duration-300">
              <a href="#register" className="hover-underline text-2xl font-semibold" onClick={closeMenu}>Đăng ký học</a>
            </li>
            <li className="my-4">
              <Link 
                href="/login" 
                className="py-2 px-5 rounded-lg text-sm font-medium border-[2px] border-blue-200 text-blue-500"
                onClick={closeMenu}
              >
                Login Admin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
