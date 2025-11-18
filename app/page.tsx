import { FadeIn, FadeOnScroll } from "./components/animation";
import CardBase from "./components/CardBase";
import Navbar from "./components/Navbar";
import imgCard1 from "@/app/images/web-twd1.jpg";
import imgCard2 from "@/app/images/web-twd4.jpg";
import imgCard3 from "@/app/images/web-twd3.jpg";
import imgBgSection1 from "@/app/images/bg-section1.jpg";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

export default function Home() {
  const dataCard = [
    {
      img: imgCard1,
      title: "Lớp tham gia kì thi lên đai",
      des: "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
    },
    {
      img: imgCard2,
      title: "Lớp tham gia kì thi lên đai",
      des: "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
    },
    {
      img: imgCard3,
      title: "Lớp tham gia kì thi lên đai",
      des: "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
    },
  ];
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

      {/* Section2 introduce clb */}
      <section
        id="introduce"
        className="h-screen flex flex-col justify-center items-center px-10 sm:px-16 md:px-20"
      >
        <h2 className="text-3xl font-bold mb-4">Về tôi</h2>
        <p className="text-center text-gray-700">
          Tôi là một lập trình viên yêu thích web và AI, chuyên về React &
          Next.js.
        </p>
      </section>

      {/* Section3 activity of clb */}
      <section id="work" className="w-full min-h-screen mb-20 md:my-0 px-10 sm:px-16 md:px-20">
        <FadeIn direction="down">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 md:mb-40">HOẠT ĐỘNG CỦA CLB</h2>
        </FadeIn>
        <div className="flex justify-between items-center flex-wrap gap-20 md:gap-8">
          {dataCard.map((item, idx) => (
            <div key={idx} className="w-full sm:w-[48%] md:w-[30%]">
              <FadeIn direction="up" delay={0}>
                <CardBase
                  img={item.img}
                  title={item.title}
                  description={item.des}
                />
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* Section4 register study */}
      <Contact/>
      
      <Footer />
    </main>
  );
}
