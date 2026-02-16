"use client";
import { FaFacebookMessenger } from "react-icons/fa";
import { FadeIn } from "./animation";
import { MdCall } from "react-icons/md";
import { SiZalo } from "react-icons/si";
import { Image, Modal } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const contactData = [
    {
      id: 1,
      title: "Hotline đăng ký học",
      subtitle: "Cô Nhàn: 0338287804",
      icon: <MdCall size={32} className="text-white" />,
      color: "bg-emerald-500",
      shadow: "shadow-emerald-200",
      href: "tel:0338287804",
      delay: 0,
    },
    {
      id: 2,
      title: "Tư vấn qua Zalo",
      subtitle: "Quét mã nhận tư vấn ngay",
      icon: <SiZalo size={32} className="text-white" />,
      color: "bg-blue-500",
      shadow: "shadow-blue-200",
      onClick: showModal,
      delay: 0.2,
    },
    {
      id: 3,
      title: "Messenger hỗ trợ",
      subtitle: "Phạm Thanh Nhàn",
      icon: <FaFacebookMessenger size={32} className="text-blue-600" />,
      color: "bg-white border border-blue-100",
      shadow: "shadow-indigo-100",
      href: "https://www.facebook.com/share/1GfXapv5Uz/?mibextid=wwXIfr",
      delay: 0.4,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* CONTACT CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
        {contactData.map((item) => (
          <FadeIn key={item.id} direction="up" delay={item.delay}>
            <motion.div
              whileHover={{ y: -8 }}
              className={`group flex items-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-full`}
              onClick={item.onClick}
            >
              {item.href ? (
                <a href={item.href} target={item.id === 3 ? "_blank" : "_self"} className="flex items-center w-full">
                  <ContactItemContent item={item} />
                </a>
              ) : (
                <div className="flex items-center w-full">
                  <ContactItemContent item={item} />
                </div>
              )}
            </motion.div>
          </FadeIn>
        ))}
      </div>

      <Modal
        title={<span className="text-lg font-bold">Mã QR Zalo Tư Vấn</span>}
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <div className="p-4 flex justify-center">
          <Image
            src="/images/qr-pham-thanh-nhan.jpg"
            alt="Mã QR Phạm Thanh Nhàn"
            className="rounded-lg shadow-md"
            preview={false}
          />
        </div>
        <p className="text-center text-gray-500 pb-4 italic">Quét để kết nối trực tiếp với cô Nhàn</p>
      </Modal>

      {/* MAP SECTION */}
      <FadeIn direction="up" delay={0.6}>
        <div className="relative w-full rounded lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-10 group">
          <iframe
            className="h-100 md:h-137.5 w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.08683611179!2d105.76518!3d21.0292112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455d28f5067fd%3A0x703684d0f6ec182a!2zQ0xCIFBhbmRhIFRhZWt3b25kbyAtIE3hu7kgxJDDrG5oLCBU4burIExpw6ptLCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1765547148485!5m2!1svi!2s"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* Overlay gradient cho map */}
          <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-3xl" />
        </div>
      </FadeIn>
    </div>
  );
}

// Sub-component cho nội dung Card để tránh lặp code
function ContactItemContent({ item }: { item: any }) {
  return (
    <>
      <div className={`${item.color} w-14 h-14 flex items-center justify-center rounded-2xl ${item.shadow} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {item.icon}
      </div>
      <div className="flex-1 ml-4">
        <h3 className="text-base lg:text-lg font-extrabold text-gray-800 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          {item.subtitle}
        </p>
      </div>
    </>
  );
}