"use client"
import { FaFacebookMessenger } from "react-icons/fa";
import { FadeIn } from "./animation";
import { MdCall } from "react-icons/md";
import { SiZalo } from "react-icons/si";
import { Modal } from "antd";
import { useState } from "react";

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
  return (
    <>
      <section id="register" className="px-5 sm:px-10 md:px-20 py-20 md:py-40">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Thông tin liên hệ Panda Taekwondo
        </h2>
        <div className="w-full flex justify-between items-center flex-wrap gap-10 py-20">
          <a
            href="tel:0338287804"
            className="w-full sm:w-[48%] md:w-[30%] flex items-center hover:mt-[-10px] duration-300 cursor-pointer"
          >
            <div className="w-[60px] h-[60px] flex items-center justify-center p-2 rounded-xl bg-green-500">
              <MdCall size={40} color="white" />
            </div>
            <div className="flex-1 pl-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold">
                Số điện thoại đăng ký học
              </h3>
              <p className="text-base">
                <strong>Cô Nhàn:</strong> 0338287804
              </p>
            </div>
          </a>


          <div onClick={showModal} className="w-full sm:w-[48%] md:w-[30%] flex items-center hover:mt-[-10px] duration-300 cursor-pointer">
            <div className="w-[60px] h-[60px] flex items-center justify-center p-2 rounded-xl bg-blue-500"><SiZalo size={40} color="white"/></div>
            <div className="flex-1 pl-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold">Quét mã QR  để nhận tư vấn</h3>
              <p className="text-base">Phạm Thanh Nhàn</p>
            </div>
          </div>
          <Modal
            title="Quét mã QR Zalo để nhận tư vấn"
            closable={true}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <img src="/images/qr-pham-thanh-nhan.jpg" alt="Mã QR Phạm Thanh Nhàn" className="w-full" />
          </Modal>

          <a
            href="https://www.facebook.com/share/1GfXapv5Uz/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-[48%] md:w-[30%] flex items-center hover:mt-[-10px] duration-300 cursor-pointer"
          >
            <div className="w-[60px] h-[60px] flex items-center justify-center p-2 rounded-xl bg-white">
              <FaFacebookMessenger size={40} color="#356ff5" />
            </div>
            <div className="flex-1 pl-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold">
                Nhận tư vấn qua Messenger
              </h3>
              <p className="text-base">Phạm Thanh Nhàn</p>
            </div>
          </a>
        </div>
        <FadeIn direction="up" delay={0.5}>
          <iframe
            className="h-[300px] md:h-[500px] shadow-xl"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3724.0859170273093!2d105.76281607525658!3d21.029247980620234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDAxJzQ1LjMiTiAxMDXCsDQ1JzU1LjQiRQ!5e0!3m2!1svi!2skr!4v1761546185393!5m2!1svi!2skr"
            style={{ border: 0, width: "100%", borderRadius: "20px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </FadeIn>
      </section>
    </>
  );
}
