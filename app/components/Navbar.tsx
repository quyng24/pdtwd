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

  // Xử lý hiệu ứng khi cuộn trang
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
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await clearUserCookie();
      await signOut(auth);
      setUser(null);
      messageApi.success("Đăng xuất thành công");
      router.replace("/");
      router.refresh();
    } catch (error) {
      messageApi.error("Đăng xuất thất bại");
    }
  };

  if (loading) return <div className="h-20 w-full" />;

  return (
    <>
      {contextHolder}
      <nav 
        className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm py-3 z-100 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <img
              src="/images/logo-primary.svg"
              alt="Logo"
              className={`transition-all duration-300 h-10 md:h-12 ${scrolled || user ? "scale-100" : "scale-110"}`}
            />
          </Link>

          {/* DESKTOP MENU - Khác nhau dựa trên Auth */}
          <div className="hidden md:flex items-center gap-10">
            {user ? (
              // Trạng thái đã đăng nhập (Admin)
              <div className="flex items-center gap-8">
                <NavLink href="/dashboard" icon={<TbLayoutDashboardFilled size={18} />} label="Dashboard" active={pathname === "/dashboard"} />
                <NavLink href="/activities" icon={<FiActivity size={18} />} label="Bài viết" active={pathname === "/activities"} />
              </div>
            ) : (
              // Trạng thái khách (Landing Page)
              <div className="flex items-center gap-8">
                <a href="#introduce" className="text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-blue-600 transition-colors">Tổng quát</a>
                <a href="#work" className="text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-blue-600 transition-colors">Hoạt động</a>
                <a href="#register" className="text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-blue-600 transition-colors">Liên hệ</a>
              </div>
            )}
          </div>

          {/* RIGHT ACTION */}
          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all"
              >
                <MdLogout size={16} />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                >
                  <FaUser size={16} />
                  Admin
                </Link>
                {/* Mobile Menu Toggle */}
                <button 
                  className="md:hidden p-2 text-gray-700" 
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <MdMenuOpen size={28} /> : <MdMenu size={28} />}
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              ref={menuRef}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              className="fixed top-20 left-4 right-4 bg-white rounded-3xl shadow-2xl z-[95] md:hidden p-8"
            >
              <ul className="flex flex-col gap-6 text-center">
                <li><a href="#introduce" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-800 flex items-center justify-center gap-2"><FaHome size={20}/> Tổng quát</a></li>
                <li><a href="#work" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-800 flex items-center justify-center gap-2"><FiActivity size={20}/> Hoạt động</a></li>
                <li><a href="#register" onClick={() => setMenuOpen(false)} className="text-lg font-bold text-gray-800 flex items-center justify-center gap-2"><FaPhoneAlt size={20}/> Liên hệ</a></li>
                <li className="pt-4 border-t border-gray-100">
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                    <FaUser size={20}/> Đăng nhập Admin
                  </Link>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Sub-component cho NavLink
function NavLink({ href, label, icon, active }: { href: string; label: string; icon: any; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-2 text-sm font-bold transition-all ${
        active ? "text-blue-600 scale-105" : "text-gray-500 hover:text-blue-600"
      }`}
    >
      {icon}
      {label}
      {active && <motion.div layoutId="nav-active" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
    </Link>
  );
}