"use client";
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
    <main className="bg-[#DBF4FE] max-w-screen">
      <Navbar></Navbar>
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

      <section
        id="introduce"
        className="h-screen flex flex-col justify-center items-center"
      >
        <h2 className="text-3xl font-bold mb-4">Về tôi</h2>
        <p className="max-w-xl text-center text-gray-700">
          Tôi là một lập trình viên yêu thích web và AI, chuyên về React &
          Next.js.
        </p>
      </section>

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

      {/* Section3 register study */}
      <section id="register" className="px-5 sm:px-10 md:px-20">
        <FadeIn direction="down"><h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">ĐĂNG KÝ HỌC NGAY BÂY GIỜ!</h2></FadeIn>
        <div className="flex justify-center items-center flex-col md:flex-row gap-10 my-40">
          <div className="w-full md:w-[50%] flex flex-col gap-6">
            <FadeIn direction="right" delay={0.2}>
              <h3 className="text-xl md:text-3xl font-bold text-left">🔥CHIÊU SINH PANDA TEAKWONDO: <br /> Rèn Luyện Sức Mạnh, Khẳng Định Bản Lĩnh!</h3>
            </FadeIn>

            <FadeIn direction="right" delay={0.4}>
              <div>
                <p className="text-base md:text-2xl font-semibold">Lớp học đa dạng, phù hợp mọi lứa tuổi:</p>
                <ul className="list-inside list-disc text-sm sm:text-base md:text-lg">
                  <li><strong>Trẻ em (5-16 tuổi):</strong> Phát triển thể chất, tăng khả năng tập trung & tự vệ cơ bản.</li>
                  <li><strong>Thanh thiếu niên & Người lớn (16+):</strong> Cải thiện sức khỏe, giải tỏa căng thẳng, thành thạo kỹ thuật võ thuật.</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.6}>
              <div>
                <p className="text-base md:text-2xl font-semibold">Tại Panda Taekwondo, bạn được CAM KẾT:</p>
                <ul className="list-inside list-disc text-sm sm:text-base md:text-lg">
                  <li><strong>Kỹ năng:</strong> Nắm vững các đòn thế Taekwondo từ cơ bản đến nâng cao.</li>
                  <li><strong>Thể chất:</strong> Tăng sức bền, dẻo dai, và phản xạ nhanh nhạy.</li>
                  <li><strong>Tinh thần:</strong> Xây dựng tính kỷ luật, sự tự tin và tinh thần võ đạo.</li>
                </ul>
              </div>
            </FadeIn>
          </div>
          <div className="flex-1 w-full md:w-[50%]">
            <FadeIn direction="left" delay={0.5}>
              <iframe
              className="google-map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3724.0859170273093!2d105.76281607525658!3d21.029247980620234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDAxJzQ1LjMiTiAxMDXCsDQ1JzU1LjQiRQ!5e0!3m2!1svi!2skr!4v1761546185393!5m2!1svi!2skr"
                style={{ border: 0, width: '100%', borderRadius: '20px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </FadeIn>
          </div>
        </div>

      </section>


      <FadeIn direction="up" delay={0}>
        <Footer />
      </FadeIn>
    </main>
  );
}
