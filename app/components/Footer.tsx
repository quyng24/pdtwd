import Image from "next/image";
import Logo from "@/app/images/logo-primary.png";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer() {
    return (
        <footer className="bg-white py-5 px-5 sm:px-10 md:px-20">
            <div className="w-full flex justify-between items-center">
                <Image src={Logo} alt="Logo" className="w-[30%]"/>
                <div className="flex items-center justify-end gap-3 w-[60%] md:w-[40%]">
                    <p className="font-light md:font-semibold text-xs md:text-base ">Theo dõi CLB: </p>
                    <div className="flex gap-2 items-center">
                        <div className="w-[30px] h-[30px] rounded-full bg-gray-400 flex items-center justify-center cursor-pointer">
                            <a href="https://www.tiktok.com/@panda_taekwondo?_t=ZS-90l39N8Zc0X&_r=1"><FaTiktok size={14} /></a>
                        </div>

                        <div className="w-[30px] h-[30px] rounded-full bg-gray-400 flex items-center justify-center cursor-pointer">
                            <a href="https://www.facebook.com/share/1JoPgGY9pS/"><FaFacebookF size={14} /></a>
                        </div>

                        <div className="w-[30px] h-[30px] rounded-full bg-gray-400 flex items-center justify-center cursor-pointer">
                            <a href="#"><AiFillInstagram size={14} /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-gray-900 h-0.5 my-3"></div>
            <p className="font-light md:font-semibold text-xs md:text-base">Address: Chung cư CT5DN2, Trần Hữu Dực, Mỹ Đình, Từ Liêm, Hà Nội</p>
        </footer>
    )
}