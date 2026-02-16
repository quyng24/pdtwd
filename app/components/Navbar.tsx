"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { clearUserCookie, getUserCookie } from "../lib/cookies";
import { UserCookie } from "../types/type";
import { message } from "antd";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { MdLogout, MdMenu, MdMenuOpen } from "react-icons/md";

import { FaUser, FaHome, FaPhoneAlt } from "react-icons/fa";

import { TbLayoutDashboardFilled } from "react-icons/tb";

import { FiActivity } from "react-icons/fi";

export default function Navbar() {
  const [user, setUser] = useState<UserCookie | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [messageApi, contextHolder] = message.useMessage();

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserCookie();
        setUser(user);
      } catch { setUser(null); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await clearUserCookie();
      await signOut(auth);
      setUser(null);
      messageApi.success("Đăng xuất thành công");
      router.replace("/");
    } catch (error) { messageApi.error("Đăng xuất thất bại"); }
  };

  if (loading) return <nav className="h-20 w-full bg-white shadow-sm" />;

  return (
    <>
      {contextHolder}
      <nav className="fixed top-0 left-0 w-full z-100 transition-all duration-300 bg-white shadow-md py-3">
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <Link href="/" className="z-110">
            <img src="/images/logo-primary.svg" alt="Logo" className="h-10 md:h-12" />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {user ? (
              <>
                <NavLink href="/dashboard" icon={<TbLayoutDashboardFilled size={18}/>} label="Dashboard" active={pathname === "/dashboard"} />
                <NavLink href="/activities" icon={<FiActivity size={18}/>} label="Bài viết" active={pathname === "/activities"} />
              </>
            ) : (
              <>
                <a href="#introduce" className="text-sm font-bold uppercase text-gray-700 hover:text-blue-600">Tổng quát</a>
                <a href="#work" className="text-sm font-bold uppercase text-gray-700 hover:text-blue-600">Hoạt động</a>
                <a href="#register" className="text-sm font-bold uppercase text-gray-700 hover:text-blue-600">Liên hệ</a>
              </>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 z-110">
            {!user && (
              <Link href="/login" className="hidden sm:flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold">
                Admin
              </Link>
            )}
            {user && (
              <button onClick={handleLogout} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-bold">
                <MdLogout size={16} /> Thoát
              </button>
            )}
            
            {/* MOBILE TOGGLE BUTTON - Luôn hiển thị trên mobile */}
            <button className="md:hidden p-2 text-blue-600" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <MdMenuOpen size={28} /> : <MdMenu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU PANEL */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white z-105 md:hidden flex flex-col p-10 pt-28"
            >
              <ul className="flex flex-col gap-8">
                {user ? (
                  <>
                    <li><Link href="/dashboard" className="text-2xl font-black text-gray-800 flex items-center gap-4"><TbLayoutDashboardFilled /> Dashboard</Link></li>
                    <li><Link href="/activities" className="text-2xl font-black text-gray-800 flex items-center gap-4"><FiActivity /> Bài viết</Link></li>
                    <li><button onClick={handleLogout} className="text-2xl font-black text-red-500 flex items-center gap-4"><MdLogout /> Đăng xuất</button></li>
                  </>
                ) : (
                  <>
                    <li><a href="#introduce" onClick={() => setMenuOpen(false)} className="text-2xl font-black text-gray-800">Tổng quát</a></li>
                    <li><a href="#work" onClick={() => setMenuOpen(false)} className="text-2xl font-black text-gray-800">Hoạt động</a></li>
                    <li><a href="#register" onClick={() => setMenuOpen(false)} className="text-2xl font-black text-gray-800">Liên hệ</a></li>
                    <li className="pt-6 border-t border-gray-100">
                      <Link href="/login" onClick={() => setMenuOpen(false)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-200">
                        <FaUser size={24}/> Quản trị viên
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

function NavLink({ href, label, icon, active }: any) {
  return (
    <Link href={href} className={`relative flex items-center gap-2 text-sm font-bold transition-all ${active ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}>
      {icon} {label}
      {active && <motion.div layoutId="underline" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600" />}
    </Link>
  );
}