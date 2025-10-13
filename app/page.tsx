"use client"
import { FadeIn, FadeOnScroll } from "./components/animation";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <FadeOnScroll startFade={50} endFade={700}>
        <section id="hero" className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-indigo-600 text-white">
          <h1 className="text-5xl font-bold mb-4">Xin chào!</h1>
          <p className="text-lg">Tôi xây dựng website bằng Next.js 🚀</p>
          <a href="#about" className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Tìm hiểu thêm
          </a>
        </section>
      </FadeOnScroll>
      <FadeIn direction="up" delay={1}>
        <div className="w-full h-screen bg-amber-100 flex justify-center items-center">
          <h3 className="text-3xl font-semibold">Test face in up</h3>
        </div>
      </FadeIn>

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

      <footer>
        <FadeIn direction="up" delay={1}>
          <div className="text-center py-12 text-black">
            <p className="text-3xl font-bold">Test footer animation</p>
          </div>
        </FadeIn>
      </footer>
    </main>
  );
}
