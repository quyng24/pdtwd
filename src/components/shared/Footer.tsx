"use client";
import Image from "next/image";
import { FaTiktok, FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaTiktok size={18} />,
      href: "https://www.tiktok.com/@panda_taekwondo",
      hover: "hover:bg-black hover:text-white"
    },
    {
      icon: <FaFacebookF size={18} />,
      href: "https://www.facebook.com/share/1JoPgGY9pS/",
      hover: "hover:bg-[#1877F2] hover:text-white"
    },
    {
      icon: <AiFillInstagram size={20} />,
      href: "#",
      hover: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white"
    },
  ];

  return (
    <footer className="bg-gray-50/50 border-t border-gray-100 pt-12 pb-6">
      <div className="mx-auto px-10 sm:px-16 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* LOGO & BRAND */}
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            <Image
              src="/images/logo-primary.svg"
              alt="Logo"
              width={150}
              height={50}
              className="w-40 h-auto"
            />
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Câu lạc bộ Taekwondo chuyên nghiệp - Nơi rèn luyện thể chất và tinh thần võ đạo cho mọi lứa tuổi.
            </p>
          </div>

          {/* SOCIAL & CONTACT QUICK ACCESS */}
          <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">Kết nối với chúng tôi</h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className={`w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300 ${social.hover}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-linear-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-start gap-2 group">
            <div className="p-2 rounded-lg bg-indigo-50 text-black group-hover:bg-gray-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600 pt-1">
              Chung cư CT5DN2, Trần Hữu Dực, Mỹ Đình, Từ Liêm, Hà Nội
            </p>
          </div>

          <p className="text-xs text-gray-400 font-medium">
            © {currentYear} Panda Taekwondo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}