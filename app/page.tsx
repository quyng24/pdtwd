"use client"
import { FadeIn, FadeOnScroll } from "./components/animation";
import CardBase from "./components/CardBase";
import Navbar from "./components/Navbar";
import imgCard1 from "@/app/images/web-twd1.jpg";
import imgCard2 from "@/app/images/web-twd4.jpg";
import imgCard3 from "@/app/images/web-twd3.jpg";
import imgBgSection1 from "@/app/images/bg-section1.jpg";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

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
      <main>
        <Navbar></Navbar>
        <FadeOnScroll startFade={300} endFade={1000}>
          <section 
            id="hero" 
            className="relative bg-fixed bg-center bg-cover h-screen flex flex-col justify-center items-center text-white"
            style={{ backgroundImage: `url(${imgBgSection1.src})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none"></div>
            <h1 className="text-5xl font-bold mb-4">Xin chào!</h1>
            <p className="text-lg">Tôi xây dựng website bằng Next.js 🚀</p>
            <a href="#about" className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Tìm hiểu thêm
            </a>
          </section>
        </FadeOnScroll>

        <div className="w-full h-screen flex justify-center items-center">
          {dataCard.map((item, idx) => (
            <div key={idx} className="w-[30%]">
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
