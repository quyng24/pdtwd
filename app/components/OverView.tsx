"use client"
import { Button, Modal } from "antd";
import { FadeIn } from "./animation";
import { useState } from "react";
import { IoBody, IoHandLeft, IoWalk } from "react-icons/io5";

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
            <p className="text-xs md:text-sm xl:text-lg text-gray-500 mb-10">(Dành cho trẻ con và thiếu niên)</p>
            <Button type="primary" size="large" className="text-white font-semibold">Xem chi tiết</Button>
          </div>
        </FadeIn>
        <Modal title="Thông tin lớp số 1:" closable={true} open={modals.modalA} onCancel={() => close("modalA")} footer={null}>
          <h2>Infomation of clb</h2>
        </Modal>

        <FadeIn direction="left" className="w-full">
          <div className="bg-white p-5 xl:p-10 rounded w-full flex flex-col items-center justify-between" onClick={() => open("modalB")}>
            <h3 className="text-base md:text-xl xl:text-2xl text-black font-bold mb-2">Lớp 2: Nâng cao tự vệ chuyên sâu</h3>
            <p className="text-xs md:text-sm xl:text-lg text-gray-500 mb-10">(Dành cho người lớn)</p>
            <Button type="primary" size="large" className="text-white font-semibold">Xem chi tiết</Button>
          </div>
        </FadeIn>
        <Modal title="Thông tin lớp số 2:" closable={true} open={modals.modalB} onCancel={() => close("modalB")} footer={null}>
          <h2>Infomation of clb 2</h2>
        </Modal>
      </div>

      <div className="w-full flex justify-between items-center flex-wrap gap-20 md:gap-10 py-10">
        {dataCard.map((item, idx) => (
          <div key={idx} className="w-full sm:w-[48%] md:w-[30%] flex flex-col items-center cursor-pointer">
            <FadeIn direction="up">
              <div className="w-full flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <div className="flex flex-col items-center rounded-2xl bg-white p-5">
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