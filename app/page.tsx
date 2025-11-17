"use client";
import { FadeIn, FadeOnScroll } from "./components/animation";
import { MdCall } from "react-icons/md";
import { SiZalo } from "react-icons/si";
import { FaFacebookMessenger } from "react-icons/fa";
import CardBase from "./components/CardBase";
import Navbar from "./components/Navbar";
import imgCard1 from "@/app/images/web-twd1.jpg";
import imgCard2 from "@/app/images/web-twd4.jpg";
import imgCard3 from "@/app/images/web-twd3.jpg";
import imgBgSection1 from "@/app/images/bg-section1.jpg";
import Footer from "./components/Footer";
import ModalWrapper from "./components/ModalWrapper";

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
          className="relative bg-fixed bg-center bg-cover h-screen flex flex-col items-start justify-center text-white px-5 sm:px-10 md:px-20"
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
        className="h-screen flex flex-col justify-center items-center"
      >
        <h2 className="text-3xl font-bold mb-4">Về tôi</h2>
        <p className="text-center text-gray-700">
          Tôi là một lập trình viên yêu thích web và AI, chuyên về React &
          Next.js.
        </p>
      </section>

      {/* Section3 activity of clb */}
      <section id="work" className="w-full min-h-screen my-40 md:my-0 px-5 sm:px-10 md:px-20 ">
        <FadeIn direction="down">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-20 md:mb-40">HOẠT ĐỘNG CỦA CLB</h2>
        </FadeIn>
        <div className="flex justify-between items-center flex-wrap gap-8">
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
      <section id="register" className="px-5 sm:px-10 md:px-20 py-20 md:py-40">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Thông tin liên hệ Panda Taekwondo</h2>
        <div className="w-full flex justify-between items-center flex-wrap gap-10 py-20">
          <a href="tel:0338287804" className="w-full sm:w-[48%] md:w-[30%] flex items-center hover:mt-[-10px] duration-300 cursor-pointer">
            <div className="w-[60px] h-[60px] flex items-center justify-center p-2 rounded-xl bg-green-500"><MdCall size={40} color="white"/></div>
            <div className="flex-1 pl-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold">Số điện thoại đăng ký học</h3>
              <p className="text-base"><strong>Cô Nhàn:</strong> 0338287804</p>
            </div>
          </a>

          <div className="w-full sm:w-[48%] md:w-[30%] flex items-center hover:mt-[-10px] duration-300 cursor-pointer">
            <ModalWrapper className="w-full flex items-center">
              <div className="w-[60px] h-[60px] flex items-center justify-center p-2 rounded-xl bg-blue-500"><SiZalo size={40} color="white"/></div>
              <div className="flex-1 pl-2">
                <h3 className="text-base md:text-lg lg:text-xl font-bold">Quét mã QR  để nhận tư vấn</h3>
                <p className="text-base">Phạm Thanh Nhàn</p>
              </div>
            </ModalWrapper>
            </div>

          <a href="https://www.facebook.com/share/1GfXapv5Uz/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-full sm:w-[48%] md:w-[30%] flex items-center hover:mt-[-10px] duration-300 cursor-pointer">
            <div className="w-[60px] h-[60px] flex items-center justify-center p-2 rounded-xl bg-white"><FaFacebookMessenger size={40} color="#356ff5"/></div>
            <div className="flex-1 pl-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold">Nhận tư vấn qua Messenger</h3>
              <p className="text-base">Phạm Thanh Nhàn</p>
            </div>
          </a>
        </div>
        <FadeIn direction="up" delay={0.5}>
          <iframe
            className="h-[300px] md:h-[500px] shadow-xl"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3724.0859170273093!2d105.76281607525658!3d21.029247980620234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDAxJzQ1LjMiTiAxMDXCsDQ1JzU1LjQiRQ!5e0!3m2!1svi!2skr!4v1761546185393!5m2!1svi!2skr"
            style={{ border: 0, width: '100%', borderRadius: '20px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </FadeIn>
      </section>
      <Footer />
    </main>
  );
}
