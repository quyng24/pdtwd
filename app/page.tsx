import { FadeIn } from "./components/animation";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import ClbActivities from "./components/clbActivities";
import OverView from "./components/OverView";

export default function Home() {
  return (
    <main className="bg-[#DBF4FE] w-screen">
      <Navbar></Navbar>

      {/* Section1 hero section */}
      <section
      id="hero"
      className="relative h-screen flex items-center justify-center bg-gradient-to-r from-[#1f3c5d] to-[#0d233f] text-white overflow-hidden"
    >
      {/* Background Image (OPTIMIZED) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/herosection-v2.jpg"
          alt="Panda Taekwondo Hero"
          fill
          priority
          className="object-cover object-top opacity-60"
        />
      </div>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Text Section */}
      <div className="absolute z-10 flex flex-col items-center justify-center text-center px-8 sm:px-12 md:px-16 lg:px-20 max-w-2xl space-y-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          PANDA TAEKWONDO
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl opacity-80">
          Khai phóng tiềm năng, làm chủ bản thân
        </p>

        <a
          href="https://forms.gle/fkx7VL47VDwkHZDR7"
          className="inline-block py-4 px-10 bg-[#1677ff] text-white font-semibold rounded-full shadow-lg hover:bg-[#DBF4FE] hover:text-black transition duration-300 ease-in-out transform hover:scale-95"
        >
          Đăng ký tập luyện
        </a>
      </div>
    </section>



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
