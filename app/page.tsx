import { FadeIn, FadeOnScroll } from "./components/animation";
import Navbar from "./components/Navbar";
import imgBgSection1 from "@/app/images/bg-section1.jpg";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import ClbActivities from "./components/clbActivities";
import OverView from "./components/OverView";

export default function Home() {
  return (
    <main className="bg-[#DBF4FE] w-screen">
      <Navbar></Navbar>

      {/* Section1 hero section */}
      <FadeOnScroll startFade={300} endFade={1000}>
        <section
          id="hero"
          className="relative bg-fixed bg-center bg-cover h-screen flex flex-col items-start justify-center text-white px-10 sm:px-16 md:px-20"
          style={{ backgroundImage: `url(${imgBgSection1.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent pointer-events-none"></div>
          <div className="z-2">
            <h1 className="text-5xl font-bold mb-4">
              PANDA TAEKWONDO: SỨC MẠNH TỪ KỶ LUẬT
            </h1>
            <p className="text-lg">Tôi xây dựng website bằng Next.js 🚀</p>
            <a
              href="#introduce"
              className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </section>
      </FadeOnScroll>

      {/* Section2 Overview clb */}
      <section id="introduce" className="w-full px-10 sm:px-16 md:px-20 py-20">
        <FadeIn direction="down"><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-20 md:mb-40">Tổng quan về CLB</h2></FadeIn>
        <OverView/>
      </section>

      {/* Section3 activities of clb */}
      <section id="work" className="w-full px-10 sm:px-16 md:px-20 py-20">
        <FadeIn direction="down"><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 md:mb-40">Hoạt động của CLB</h2></FadeIn>
        <ClbActivities/>
      </section>

      {/* Section4 contact */}
      <section id="register" className="px-10 sm:px-16 md:px-20 py-20">
        <FadeIn direction="down"><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 md:mb-5">Thông tin liên hệ Panda Taekwondo</h2></FadeIn>
        <Contact/>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
