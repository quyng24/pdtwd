"use client";

import { Button, Modal } from "antd";
import { FadeIn } from "./animation";
import { useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import Image from "next/image";
import { dataOverview } from "../store/dataMock";

type ModalKey = "modalA" | "modalB";

const classRowsA = [
  {
    label: "Đối tượng",
    value: "Từ 5 tuổi trở lên",
    note: "Khuyến khích phát triển toàn diện (thể chất, tinh thần, kỷ luật)",
  },
  {
    label: "Môn học",
    value: "Taekwondo",
    note: "Tập trung vào căn bản, tăng cường sức khỏe, kỹ năng tự vệ cơ bản",
  },
  {
    label: "Thời gian học",
    value: "18h15 - 19h30 (Thứ Ba, Thứ Năm, Chủ Nhật)",
    note: "Khung giờ phù hợp sau giờ học và trước giờ nghỉ ngơi của gia đình",
  },
  {
    label: "Lợi ích nổi bật",
    value: "Tăng khả năng tập trung, nâng cao thể lực, hình thành kỷ luật và sự tự tin",
    note: "",
  },
];

const classRowsB = [
  {
    label: "Đối tượng",
    value: "Từ 16 tuổi trở lên",
    note: "Phù hợp với thanh thiếu niên và người lớn muốn rèn sức khỏe, giảm stress",
  },
  {
    label: "Môn học",
    value: "Taekwondo",
    note: "Tập trung kỹ thuật thực chiến, đối kháng cường độ cao, cải thiện sức bền",
  },
  {
    label: "Thời gian học",
    value: "19h15 - 20h30 (Thứ Ba, Thứ Năm, Chủ Nhật)",
    note: "Khung giờ sau giờ làm, thuận tiện cho người bận rộn",
  },
  {
    label: "Lợi ích nổi bật",
    value: "Giảm stress, tăng cường sức khỏe tim mạch, tự vệ hiệu quả và tự tin hơn",
    note: "",
  },
];

function ClassDetail({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string; note: string }[];
}) {
  return (
    <div>
      <h4 className="mb-5 text-base font-bold text-slate-900 md:text-lg">{title}</h4>
      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-3 md:gap-4"
          >
            <p className="text-sm font-semibold text-slate-700">{row.label}</p>
            <p className="text-sm font-medium text-slate-900">{row.value}</p>
            <p className="text-sm text-slate-600">{row.note}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-4 mt-10">
        <a href="https://forms.gle/fkx7VL47VDwkHZDR7" target="_blank">
          <div className="w-full p-4 rounded-xl bg-[#1677ff] text-white text-center font-semibold hover:scale-95 duration-300">Đăng ký trực tiếp</div>
        </a>
        <a href="https://www.facebook.com/share/1GfXapv5Uz/?mibextid=wwXIfr" target="_blank">
          <div className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-[#1677ff] text-white text-center font-semibold hover:scale-95 duration-300">
            <FaFacebookMessenger/>
            Tư vấn miễn phí
          </div>
        </a>
      </div>
      <p className="mt-5 text-sm text-slate-600">
        Hoặc liên hệ qua Zalo: 0338287804 (Phạm Thanh Nhàn)
      </p>
    </div>
  );
}

export default function OverView() {
  const [modals, setModals] = useState({
    modalA: false,
    modalB: false,
  });

  const open = (key: ModalKey) => {
    setModals((prev) => ({ ...prev, [key]: true }));
  };

  const close = (key: ModalKey) => {
    setModals((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="w-full">
      <div className="mb-14 rounded-xl border border-sky-100 bg-gradient-to-br from-white via-sky-50 to-cyan-100 p-6 shadow-sm md:mb-20 md:p-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          <FadeIn direction="right">
            <div className="space-y-4">
              <p className="inline-flex rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
                Panda Taekwondo
              </p>
              <h3 className="text-2xl font-bold leading-tight text-slate-900 md:text-4xl">
                Lộ trình học phù hợp cho trẻ em đến người lớn
              </h3>
              <p className="text-sm leading-7 text-slate-600 md:text-base">
                Chương trình được thiết kế theo cấp độ, kết hợp rèn kỹ năng võ
                thuật, phát triển thể chất và kỷ luật trong mỗi buổi tập.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                Lợi ích cốt lõi
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-900 p-4 text-white">
                  <p className="text-2xl font-bold">03</p>
                  <p className="text-xs opacity-80">Buổi mới tuần</p>
                </div>
                <div className="rounded-xl bg-cyan-100 p-4 text-slate-900">
                  <p className="text-2xl font-bold">05+</p>
                  <p className="text-xs opacity-80">Từ 5 tuổi trở lên</p>
                </div>
                <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-medium text-slate-700">
                    Mỗi nhóm tuổi có giáo án riêng, huấn luyện viên theo sát tiến
                    độ để tối ưu hiệu quả tập luyện.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="mb-16 grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        <FadeIn direction="right" className="w-full">
          <div
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8"
            onClick={() => open("modalA")}
          >
            <div className="absolute right-0 top-0 h-10 md:h-24 w-10 md:w-24 rounded-bl-[36px] bg-sky-100" />
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">
              Lớp 1
            </p>
            <h3 className="mb-2 text-xl font-bold text-slate-900 md:text-2xl">
              Bắt đầu với võ thuật
            </h3>
            <p className="mb-8 text-sm text-slate-600 md:text-base">
              Dành cho trẻ em và thiếu niên cần nền tảng kỹ thuật và rèn kỷ luật
            </p>
            <Button type="primary" size="large" className="text-white">
              Xem chi tiết
            </Button>
          </div>
        </FadeIn>

        <FadeIn direction="left" className="w-full">
          <div
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8"
            onClick={() => open("modalB")}
          >
            <div className="absolute right-0 top-0 h-10 md:h-24 w-10 md:w-24 rounded-bl-[36px] bg-cyan-100" />
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700">
              Lớp 2
            </p>
            <h3 className="mb-2 text-xl font-bold text-slate-900 md:text-2xl">
              Nâng cao và tự vệ chuyên sâu
            </h3>
            <p className="mb-8 text-sm text-slate-600 md:text-base">
              Dành cho người lớn muốn tăng thể lực, kỹ năng thực chiến và giải tỏa stress
            </p>
            <Button type="primary" size="large" className="text-white">
              Xem chi tiết
            </Button>
          </div>
        </FadeIn>
      </div>

      <Modal
        title="Thông tin lớp số 1"
        closable
        open={modals.modalA}
        onCancel={() => close("modalA")}
        footer={null}
        width={860}
      >
        <ClassDetail
          title="BẮT ĐẦU VÕ THUẬT (Trẻ em và Thiếu niên)"
          rows={dataOverview.infomation_class1}
        />
      </Modal>

      <Modal
        title="Thông tin lớp số 2"
        closable
        open={modals.modalB}
        onCancel={() => close("modalB")}
        footer={null}
        width={860}
      >
        <ClassDetail
          title="NÂNG CAO VÀ TỰ VỆ CHUYÊN SÂU (Người lớn)"
          rows={dataOverview.infomation_class2}
        />
      </Modal>

      {/* CARD SKILL */}
      <div className="w-full py-6 md:py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {dataOverview.skill_cards.map((item, idx) => (
            <FadeIn key={idx} direction="up" delay={idx * 0.2}>
              <div className="group p-6 text-center">
                <div className="relative flex justify-center items-center mb-6 transform transition-all duration-500 ease-out group-hover:scale-125 group-hover:-rotate-12 group-hover:-translate-y-2">
                  <Image src={item.icon} alt={item.title} width={108} height={108} />
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-white min-h-[110px] lg:min-h-[150px] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <h3 className="text-base md:text-xl xl:text-2xl text-black font-bold mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm xl:text-lg text-black text-center">{item.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
