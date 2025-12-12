"use client";
import { FaFacebookMessenger } from "react-icons/fa";
import { FadeIn } from "./animation";
import { MdCall } from "react-icons/md";
import { SiZalo } from "react-icons/si";
import { Image, Modal } from "antd";
import { useState } from "react";

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  return (
    <>
      <div className="w-full flex justify-between items-center flex-wrap gap-10 py-10">
        <FadeIn direction="right" className="w-full sm:w-[48%] md:w-[30%]">
          <a
            href="tel:0338287804"
            className="flex items-center hover:mt-[-10px] duration-300 cursor-pointer"
          >
            <div className="w-[60px] h-[60px] flex items-center justify-center p-2 rounded-xl bg-green-500">
              <MdCall size={40} color="white" />
            </div>
            <div className="flex-1 pl-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-black">
                Số điện thoại đăng ký học
              </h3>
              <p className="text-base text-black">
                <strong>Cô Nhàn:</strong> 0338287804
              </p>
            </div>
          </a>
        </FadeIn>

        <FadeIn
          direction="right"
          delay={0.2}
          className="w-full sm:w-[48%] md:w-[30%]"
        >
          <div
            onClick={showModal}
            className="flex items-center hover:mt-[-10px] duration-300 cursor-pointer"
          >
            <div className="w-[60px] h-[60px] flex items-center justify-center p-2 rounded-xl bg-blue-500">
              <SiZalo size={40} color="white" />
            </div>
            <div className="flex-1 pl-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-black">
                Quét mã QR để nhận tư vấn
              </h3>
              <p className="text-base text-black">Phạm Thanh Nhàn</p>
            </div>
          </div>
        </FadeIn>
        <Modal
          title="Quét mã QR Zalo để nhận tư vấn"
          closable={true}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Image
            src="/images/qr-pham-thanh-nhan.jpg"
            alt="Mã QR Phạm Thanh Nhàn"
          />
        </Modal>

        <FadeIn
          direction="right"
          delay={0.4}
          className="w-full sm:w-[48%] md:w-[30%]"
        >
          <a
            href="https://www.facebook.com/share/1GfXapv5Uz/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:mt-[-10px] duration-300 cursor-pointer"
          >
            <div className="w-[60px] h-[60px] flex items-center justify-center p-2 rounded-xl bg-white">
              <FaFacebookMessenger size={40} color="#356ff5" />
            </div>
            <div className="flex-1 pl-2">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-black">
                Nhận tư vấn qua Messenger
              </h3>
              <p className="text-base text-black">Phạm Thanh Nhàn</p>
            </div>
          </a>
        </FadeIn>
      </div>
      <FadeIn direction="up" delay={0.5}>
        <iframe
          className="h-[300px] md:h-[500px] shadow-xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.08683611179!2d105.76518!3d21.0292112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455d28f5067fd%3A0x703684d0f6ec182a!2zQ0xCIFBhbmRhIFRhZWt3b25kbyAtIE3hu7kgxJDDrG5oLCBU4burIExpw6ptLCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1765547148485!5m2!1svi!2s"
          style={{ border: 0, width: "100%", borderRadius: '20px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </FadeIn>
    </>
  );
}
