"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dayjs from "dayjs";

import Navbar from "@/components/shared/Navbar";
import { getUserCookie } from "@/lib/cookies";
import { allowedEmails } from "@/lib/auth";
import RegisterStudent from "@/components/RegisterStudent";
import TakeAttendance from "@/components/TakeAttendance";
import TableLog from "@/components/TableLog";
import { DataTypeTable } from "@/types/type";
import { attendanceLogApi } from "@/services/attendance";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function DashboardPage() {
    const router = useRouter();
    const [modals, setModals] = useState({ modalA: false, modalB: false });
    const [nameUser, setNameUser] = useState<string>("");
    const [data, setData] = useState<DataTypeTable[]>([]);
    const [ageFilter, setAgeFilter] = useState("");

    useEffect(() => {
        const verifyUser = async () => {
            const user = await getUserCookie();
            if (!user || !allowedEmails.includes(user.email)) {
                router.replace("/");
            } else {
                setNameUser(user.name);
            }
        };
        verifyUser();
    }, [router]);

    const fetchLogs = useCallback(async () => {
        try {
            const response = await attendanceLogApi();
            if (response?.data) setData(response.data);
        } catch (error) {
            toast.error("Lỗi tải dữ liệu");
        }
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const stats = {
        total: data.length,
        today: data.filter(i => dayjs(i.checkin_time).isSame(dayjs(), 'day')).length,
        unique: new Set(data.map(i => i.student_name)).size
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Navbar />
            <div className="mx-auto mt-20 w-full max-w-7xl px-6 py-8">

                {/* Header & Stats */}
                <section className="rounded-2xl p-6 shadow-sm bg-white border border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">Panda Management</p>
                    <h1 className="mt-2 text-3xl font-black text-slate-900 italic">Xin chào, {nameUser || "Admin"}</h1>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <StatCard label="Tổng lượt điểm danh" value={stats.total} color="text-blue-600" />
                        <StatCard label="Đi tập hôm nay" value={stats.today} color="text-emerald-600" />
                        <StatCard label="Số võ sinh đã quét" value={stats.unique} color="text-indigo-600" />
                    </div>
                </section>

                {/* Action Buttons */}
                <section className="mt-6 grid gap-4 md:grid-cols-2">
                    <ActionButton
                        title="Điểm danh khuôn mặt"
                        desc="Mở camera nhận diện AI"
                        gradient="from-blue-600 to-indigo-700"
                        onClick={() => setModals(p => ({ ...p, modalA: true }))}
                    />
                    <ActionButton
                        title="Thêm võ sinh mới"
                        desc="Đăng ký vector khuôn mặt"
                        gradient="from-emerald-600 to-teal-600"
                        onClick={() => setModals(p => ({ ...p, modalB: true }))}
                    />
                </section>

                {/* Shadcn Dialogs (Thay cho Antd Modal) */}
                <Dialog open={modals.modalA} onOpenChange={(val) => setModals(p => ({ ...p, modalA: val }))}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader><DialogTitle>Hệ thống điểm danh AI</DialogTitle></DialogHeader>
                        <TakeAttendance />
                    </DialogContent>
                </Dialog>

                <Dialog open={modals.modalB} onOpenChange={(val) => setModals(p => ({ ...p, modalB: val }))}>
                    <DialogContent className="max-w-md">
                        <DialogHeader><DialogTitle>Đăng ký võ sinh mới</DialogTitle></DialogHeader>
                        <RegisterStudent />
                    </DialogContent>
                </Dialog>

                {/* Table Section */}
                <TableLog
                    data={data}
                    ageFilter={ageFilter}
                    handleFilterChange={(e) => setAgeFilter(e.target.value)}
                    handleReset={() => setAgeFilter("")}
                />
            </div>
        </div>
    );
}

// UI Sub-components
const StatCard = ({ label, value, color }: any) => (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-tight">{label}</p>
        <p className={`mt-1 text-2xl font-black ${color}`}>{value}</p>
    </div>
);

const ActionButton = ({ title, desc, gradient, onClick }: any) => (
    <button onClick={onClick} className={`rounded-2xl bg-linear-to-r ${gradient} p-6 text-left text-white shadow-lg transition-transform hover:scale-[1.01] active:scale-95`}>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-1 text-sm opacity-80">{desc}</p>
    </button>
);