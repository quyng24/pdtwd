"use client"
import { login } from "../lib/apiAuth";

export default function Navbar() {
  const handleLogin = () => login();
  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <ul className="flex justify-center space-x-6 p-4">
        <li className="hover:text-blue-600 duration-300"><a href="#hero" className="hover-underline text-2xl font-semibold">Trang chủ</a></li>
        <li className="hover:text-blue-600 duration-300"><a href="#about" className="hover-underline text-2xl font-semibold">Giới thiệu</a></li>
        <li className="hover:text-blue-600 duration-300"><a href="#contact" className="hover-underline text-2xl font-semibold">Liên hệ</a></li>
      </ul>
      <button onClick={handleLogin}>Login Admin</button>
    </nav>
  );
}
