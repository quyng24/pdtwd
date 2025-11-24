"use client"
import { Button, Modal } from "antd";
import { FadeIn } from "./animation";
import { useState } from "react";
import { IoBody, IoHandLeft, IoWalk } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";

export default function OverView() {
  const [modals, setModals] = useState({
    modalA: false,
    modalB: false,
  });
  const dataCard = [
    {
      title: 'Kỹ năng',
      desc: 'Nắm vững các đòn thế Taekwondo từ cơ bản đến nâng cao',
      icon: <IoBody size={60} color="black"/>
    },
    {
      title: 'Thể chất',
      desc: 'Tăng sức bền, dẻo dai và phản xạ nhanh nhạy',
      icon: <IoWalk size={60} color="black"/>
    },
    {
      title: 'Tinh thần',
      desc: 'Xây dựng tính kỉ luật, sử tỉ mỉ và tinh thần võ đạo',
      icon: <IoHandLeft size={60} color="black"/>
    },
  ]
    
  const open = (key: "modalA" | "modalB") => {
    setModals(prev => ({ ...prev, [key]: true }));
  };

  const close = (key: "modalA" | "modalB") => {
    setModals(prev => ({ ...prev, [key]: false }));
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-20 mb-40">
        <FadeIn direction="right" className="w-full">
          <div className="bg-white p-5 xl:p-10 rounded w-full flex flex-col items-center justify-between" onClick={() => open("modalA")}>
            <h3 className="text-base md:text-xl xl:text-2xl text-black font-bold mb-2">Lớp 1: Bắt đầu với võ thuật</h3>
            <p className="text-xs md:text-sm xl:text-lg text-gray-500 mb-10">(Dành cho trẻ cem và thiếu niên)</p>
            <Button type="primary" size="large" className="text-white font-semibold">Xem chi tiết</Button>
          </div>
        </FadeIn>
        <Modal title="Thông tin lớp số 1:" closable={true} open={modals.modalA} onCancel={() => close("modalA")} footer={null}>
          {/* Lớp số 1 */}
          <div>
            <div className="mb-6">
              <p className="text-lg font-semibold">BẮT ĐẦU VÕ THUẬT (Dành cho Trẻ em & Thiếu niên)</p>
            </div>

            <div className="w-full flex items-start border-t-[1px] border-t-gray-200 py-4">
              <div className="w-[30%] font-semibold">Đối tượng</div>
              <div className="w-[70%] flex items-start gap-4">
                <p className="w-[50%]">Các bạn nhỏ từ <strong>5 tuổi đến hết cấp THCS</strong></p>
                <p className="w-[50%]">Khuyến khích phát triển toàn diện (thể chất, tinh thần, kỷ luật)</p>
              </div>
            </div>

            <div className="w-full flex items-start border-t-[1px] border-t-gray-200 py-4">
              <div className="w-[30%] font-semibold">Môn học</div>
              <div className="w-[70%] flex items-start gap-4">
                <p className="w-[50%]">Taekwondo</p>
                <p className="w-[50%]">Tập trung vào căn bản, tăng cường sức khỏe, kỹ năng tự vệ cơ bản và tính kỷ luật</p>
              </div>
            </div>

            <div className="w-full flex items-start border-t-[1px] border-t-gray-200 py-4">
              <div className="w-[30%] font-semibold">Thời gian học</div>
              <div className="w-[70%] flex items-start gap-4">
                <p className="w-[50%]">18h15 – 19h30 (Các ngày: Thứ Ba, Năm, Bảy)</p>
                <p className="w-[50%]">Khung giờ phù hợp sau giờ học và trước giờ nghỉ ngơi của gia đình</p>
              </div>
            </div>

            <div className="w-full flex items-start border-t-[1px] border-t-gray-200 py-4">
              <div className="w-[30%] font-semibold">Lợi ích nổi bật</div>
              <div className="w-[70%]">Tăng khả năng tập trung, nâng cao thể lực, hình thành tính kỷ luật và sự tự tin</div>
            </div>
          </div>
          <div className="my-4 w-full">
            <a href="tel:0338287804">
              <div className="w-full p-4 rounded-xl bg-[#1677ff] text-white text-center font-semibold hover:scale-95 duration-300">
                Gọi điện đăng ký trực tiếp
              </div>
            </a>
            <p className="mt-6">Hoặc liên hệ tư vấn đăng ký qua Zalo: 0338287804 (Phạm Thanh Nhàn)</p>
          </div>
        </Modal>

        <FadeIn direction="left" className="w-full">
          <div className="bg-white p-5 xl:p-10 rounded w-full flex flex-col items-center justify-between" onClick={() => open("modalB")}>
            <h3 className="text-base md:text-xl xl:text-2xl text-black font-bold mb-2">Lớp 2: Nâng cao tự vệ chuyên sâu</h3>
            <p className="text-xs md:text-sm xl:text-lg text-gray-500 mb-10">(Dành cho người lớn)</p>
            <Button type="primary" size="large" className="text-white font-semibold">Xem chi tiết</Button>
          </div>
        </FadeIn>
        <Modal title="Thông tin lớp số 2:" closable={true} open={modals.modalB} onCancel={() => close("modalB")} footer={null}>
          {/* Lớp số 1 */}
          <div>
            <div className="mb-6">
              <p className="text-lg font-semibold">NÂNG CAO & TỰ VỆ CHUYÊN SÂU (Dành cho Người lớn)</p>
            </div>

            <div className="w-full flex items-start border-t-[1px] border-t-gray-200 py-4">
              <div className="w-[30%] font-semibold">Đối tượng</div>
              <div className="w-[70%] flex items-start gap-4">
                <p className="w-[50%]">Thanh thiếu niên và người lớn <strong>từ 16 tuổi trở lên</strong></p>
                <p className="w-[50%]">Phù hợp cho người đi làm, muốn rèn luyện sức khỏe, giảm stress và học tự vệ thực chiến</p>
              </div>
            </div>

            <div className="w-full flex items-start border-t-[1px] border-t-gray-200 py-4">
              <div className="w-[30%] font-semibold">Môn học</div>
              <div className="w-[70%] flex items-start gap-4">
                <p className="w-[50%]">Taekwondo</p>
                <p className="w-[50%]">Tập trung vào kỹ thuật thực chiến, rèn luyện sức bền, đối kháng cường độ cao, và nâng cao sức khỏe tim mạch</p>
              </div>
            </div>

            <div className="w-full flex items-start border-t-[1px] border-t-gray-200 py-4">
              <div className="w-[30%] font-semibold">Thời gian học</div>
              <div className="w-[70%] flex items-start gap-4">
                <p className="w-[50%]">19h15 – 20h30 (Các ngày: Thứ Ba, Năm, Bảy)</p>
                <p className="w-[50%]">Khung giờ sau giờ làm, thuận tiện cho người bận rộn</p>
              </div>
            </div>

            <div className="w-full flex items-start border-t-[1px] border-t-gray-200 py-4">
              <div className="w-[30%] font-semibold">Lợi ích nổi bật</div>
              <div className="w-[70%]">Giảm stress, tăng cường sức khỏe tim mạch, học được kỹ năng tự vệ hiệu quả và tăng sự tự tin trong giao tiếp xã hội</div>
            </div>
          </div>

          <div className="my-4 w-full">
            <div className="w-full flex gap-4">
              <a href="https://forms.gle/fkx7VL47VDwkHZDR7" className="w-[50%]">
                <div className="w-full p-4 rounded-xl bg-[#1677ff] text-white text-center font-semibold hover:scale-95 duration-300">Đăng ký trực tiếp</div>
              </a>
              <a href="https://www.facebook.com/share/1GfXapv5Uz/?mibextid=wwXIfr" className="w-[50%]">
                <div className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-[#1677ff] text-white text-center font-semibold hover:scale-95 duration-300">
                  <FaFacebookMessenger/>
                  Tư vấn miễn phí
                </div>
              </a>
            </div>
            <p className="mt-6">Hoặc liên hệ tư vấn đăng ký qua Zalo: 0338287804 (Phạm Thanh Nhàn)</p>
          </div>
        </Modal>
      </div>

      <div className="w-full flex justify-between items-center flex-wrap gap-20 md:gap-10 py-10">
        {dataCard.map((item, idx) => (
          <div key={idx} className="w-full sm:w-[48%] md:w-[30%] flex flex-col items-center cursor-pointer">
            <FadeIn direction="up">
              <div className="w-full flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-white min-h-[112px] p-5">
                <h3 className="text-base md:text-xl xl:text-2xl text-black font-bold mb-1">{item.title}</h3>
                <p className="text-xs md:text-sm xl:text-lg text-black text-center">{item.desc}</p>
              </div>
            </FadeIn>
          </div>
        ))}
      </div>
    </div>
  )
}