"use client"
import { useRouter, usePathname } from "next/navigation";
import { login, logout } from "../lib/apiAuth";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const handleLogin = () => login();
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  
  return (
    <>
      { isAdmin ? (
        <nav className="fixed top-0 w-full bg-white shadow z-50">
          <h2>Admin</h2>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      ) : (
        <nav className="fixed top-0 w-full bg-white shadow z-50">
          <ul className="flex justify-center space-x-6 p-4">
            <li className="hover:text-blue-600 duration-300"><a href="#hero" className="hover-underline text-2xl font-semibold">Trang chủ</a></li>
            <li className="hover:text-blue-600 duration-300"><a href="#about" className="hover-underline text-2xl font-semibold">Giới thiệu</a></li>
            <li className="hover:text-blue-600 duration-300"><a href="#contact" className="hover-underline text-2xl font-semibold">Liên hệ</a></li>
          </ul>
          <button onClick={handleLogin}>Login Admin</button>
        </nav>
      )}
    </>
  );
}
