"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Modal, message } from "antd";
import { useRouter } from "next/navigation";

import Navbar from "../components/Navbar";
import { getUserCookie } from "../lib/cookies";
import { allowedEmails } from "../lib/auth";
import RegisterStudent from "../components/RegisterStudent";
import TakeAttendance from "../components/TakeAttendance";
import TableLog from "../components/TableLog";
import { DataTypeTable } from "../types/type";
import { attendanceLogApi } from "../services/student";

export default function AdminDashboard() {
  const router = useRouter();
  const [modals, setModals] = useState({ modalA: false, modalB: false });
  const [nameUser, setNameUser] = useState<string>("");
  const [data, setData] = useState<DataTypeTable[]>([]); // Khởi tạo mảng rỗng
  const [ageFilter, setAgeFilter] = useState("");

  // --- Logic Xác thực User ---
  useEffect(() => {
    let isMounted = true;
    const verifyUser = async () => {
      try {
        const user = await getUserCookie();
        if (!isMounted) return;
        if (!user || !allowedEmails.includes(user.email)) {
          router.replace("/");
        } else {
          setNameUser(user.name);
        }
      } catch (error) {
        router.replace("/");
      }
    };
    verifyUser();
    return () => { isMounted = false; };
  }, [router]);

  // --- Logic Lấy dữ liệu ---
  const fetchStudents = useCallback(async () => {
    try {
      const response = await attendanceLogApi();
      if (response?.data) {
        setData(response.data);
      }
    } catch (error) {
      message.error("Không thể tải danh sách học viên");
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // --- Logic Bộ Lọc (Tối ưu dùng useMemo) ---
  const filteredData = useMemo(() => {
    const parsedAge = parseInt(ageFilter, 10);
    if (isNaN(parsedAge)) return data;
    return data.filter((item) => item.age < parsedAge);
  }, [data, ageFilter]);

  const handleReset = () => setAgeFilter("");

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <div className="mx-auto mt-20 w-full max-w-7xl px-6 py-8">

        {/* Dashboard Header */}
        <section className="rounded-2xl p-6 shadow-sm bg-white border border-slate-100">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Panda Management</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Xin chào, {nameUser || "Admin"}</h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <StatCard label="Tổng học viên" value={data.length} color="blue" />
            <StatCard label="Kết quả lọc" value={filteredData.length} color="emerald" />
            <StatCard label="Bộ lọc tuổi" value={ageFilter ? `< ${ageFilter}` : "Tất cả"} color="indigo" />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <ActionButton
            title="Điểm danh khuôn mặt"
            desc="Mở camera nhận diện học viên"
            theme="blue"
            onClick={() => setModals(p => ({ ...p, modalA: true }))}
          />
          <ActionButton
            title="Thêm học sinh mới"
            desc="Quét khuôn mặt & tạo hồ sơ"
            theme="emerald"
            onClick={() => setModals(p => ({ ...p, modalB: true }))}
          />
        </section>

        {/* Modals */}
        <Modal
          title="Hệ thống điểm danh"
          open={modals.modalA}
          onCancel={() => setModals(p => ({ ...p, modalA: false }))}
          footer={null} width={700} destroyOnHidden
        >
          <TakeAttendance />
        </Modal>

        <Modal
          title="Ghi danh học viên mới"
          open={modals.modalB}
          onCancel={() => setModals(p => ({ ...p, modalB: false }))}
          footer={null} width={500} destroyOnHidden
        >
          <RegisterStudent />
        </Modal>

        {/* Table Section */}
        <div className="mt-8">
          <TableLog
            data={data}
            ageFilter={ageFilter}
            filterData={filteredData}
            handleFilterChange={(e: any) => setAgeFilter(e.target.value)}
            handleFilter={() => { }}
            handleReset={handleReset}
          />
        </div>
      </div>
    </div>
  );
}

// --- Sub-components để sạch code ---
const StatCard = ({ label, value, color }: any) => (
  <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 shadow-sm">
    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
    <p className={`mt-1 text-2xl font-black text-${color}-600`}>{value}</p>
  </div>
);

const ActionButton = ({ title, desc, theme, onClick }: any) => {
  const colors = theme === "blue" ? "from-blue-600 to-indigo-700 shadow-blue-100" : "from-emerald-600 to-teal-600 shadow-emerald-100";
  return (
    <button onClick={onClick} className={`rounded-2xl bg-gradient-to-r ${colors} p-6 text-left text-white shadow-xl transition-all hover:scale-[1.02] active:scale-95`}>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-1 text-sm opacity-80">{desc}</p>
    </button>
  );
};