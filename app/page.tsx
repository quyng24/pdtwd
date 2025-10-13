"use client"
import { FadeOnScroll } from "./components/animation";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <FadeOnScroll startFade={50} endFade={700}>
        <div className="h-screen flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-black text-6xl font-bold mb-4">Scroll Animation Demo</h1>
            <p className="text-xl text-slate-300">Khối này sẽ mờ dần khi bạn scroll xuống</p>
          </div>
        </div>
      </FadeOnScroll>
      <section id="hero" className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-indigo-600 text-white">
        <h1 className="text-5xl font-bold mb-4">Xin chào!</h1>
        <p className="text-lg">Tôi xây dựng website bằng Next.js 🚀</p>
        <a href="#about" className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Tìm hiểu thêm
        </a>
      </section>

      <section id="about" className="h-screen flex flex-col justify-center items-center bg-gray-100">
        <h2 className="text-3xl font-bold mb-4">Về tôi</h2>
        <p className="max-w-xl text-center text-gray-700">
          Tôi là một lập trình viên yêu thích web và AI, chuyên về React & Next.js.
        </p>
      </section>

      <section id="contact" className="h-screen flex flex-col justify-center items-center bg-indigo-50">
        <h2 className="text-3xl font-bold mb-4">Liên hệ</h2>
        <p>Email: <a href="mailto:quy@example.com" className="text-blue-600 underline">quy@example.com</a></p>
      </section>

    </main>
  );
}
