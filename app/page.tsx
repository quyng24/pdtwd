"use client"
import { FadeIn, FadeOnScroll } from "./components/animation";
import CardBase from "./components/CardBase";
import Navbar from "./components/Navbar";
import imgCard1 from "@/app/images/web-twd1.jpg";
import imgCard2 from "@/app/images/web-twd4.jpg";
import imgCard3 from "@/app/images/web-twd3.jpg";
import imgBgSection1 from "@/app/images/bg-section1.jpg";
import Footer from "./components/Footer";

export default function Home() {
  const dataCard = [
    {
      img: imgCard1, 
      title: 'Lớp tham gia kì thi lên đai', 
      des: 'Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương'
    },
    {
      img: imgCard2,
      title: 'Lớp tham gia kì thi lên đai',
      des: 'Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương'
    },
    {
      img: imgCard3,
      title: 'Lớp tham gia kì thi lên đai',
      des: 'Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương'
    }
  ]
  return (
      <main className="bg-gradient-to-r from-[#e6f7fa] to-[#fff3f8]">
        <Navbar></Navbar>
        <FadeOnScroll startFade={300} endFade={1000}>
          <section 
            id="hero" 
            className="relative bg-fixed bg-center bg-cover h-screen flex flex-col items-start justify-center text-white px-5 sm:px-10 md:px-20"
            style={{ backgroundImage: `url(${imgBgSection1.src})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent pointer-events-none"></div>
            <div className="z-2">
              <h1 className="text-5xl font-bold mb-4">PANDA TAEKWONDO: SỨC MẠNH TỪ KỶ LUẬT</h1>
              <p className="text-lg">Tôi xây dựng website bằng Next.js 🚀</p>
              <a href="#about" className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                Tìm hiểu thêm
              </a>
            </div>
          </section>
        </FadeOnScroll>

        <div className="w-full min-h-screen flex justify-between items-center flex-wrap gap-3 mt-40 md:mt-0 px-5 sm:px-10 md:px-20 ">
          {dataCard.map((item, idx) => (
            <div key={idx} className="w-full sm:w-[48%] md:w-[30%]">
              <FadeIn direction="up" delay={0}>
                <CardBase img={item.img} title={item.title} description={item.des} />
              </FadeIn>
            </div>
          ))}
        </div>

        <section id="about" className="h-screen flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Về tôi</h2>
          <p className="max-w-xl text-center text-gray-700">
            Tôi là một lập trình viên yêu thích web và AI, chuyên về React & Next.js.
          </p>
        </section>

        <section id="contact" className="h-screen flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Liên hệ</h2>
          <p>Email: <a href="mailto:quy@example.com" className="text-blue-600 underline">quy@example.com</a></p>
        </section>

        <FadeIn direction="up" delay={0}>
          <Footer/>
        </FadeIn>
      </main>
  );
}
