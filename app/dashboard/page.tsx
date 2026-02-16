"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Navbar from "../components/Navbar";
import { getUserCookie } from "../lib/cookies";
import { allowedEmails } from "../lib/auth";
import { useRouter } from "next/navigation";
import { Button, Input, Table, Modal } from "antd";
import type { TableProps } from "antd";
import { DataTypeTable, initialData } from "../types/type";
import RegisterStudent from "../components/RegisterStudent";
import TakeAttendance from "../components/TakeAttendance";

export default function AdminDashboard() {
  const router = useRouter();
  const [modals, setModals] = useState({
    modalA: false,
    modalB: false,
  });
  const [nameUser, setNameUser] = useState<string | undefined>("");
  const [ageFilter, setAgeFilter] = useState(""); // Trạng thái lưu giá trị filter
  const [data] = useState<DataTypeTable[]>(initialData);
  const [filterData, setFilterData] = useState<DataTypeTable[]>(initialData);

  const open = (key: "modalA" | "modalB") => {
    setModals((prev) => ({ ...prev, [key]: true }));
  };

  const close = (key: "modalA" | "modalB") => {
    setModals((prev) => ({ ...prev, [key]: false }));
  };
  // Hàm xử lý khi người dùng nhập giá trị vào filter
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgeFilter(e.target.value);
  };

  // Hàm xử lý lọc dữ liệu khi người dùng nhấn nút "Lọc"
  const handleFilter = () => {
    const parsedAge = parseInt(ageFilter, 10);
    if (Number.isNaN(parsedAge)) {
      setFilterData(data);
      return;
    }
    const filteredData = data.filter(
      (item) => item.age < parsedAge
    );
    setFilterData(filteredData);
  };
  const handleReset = () => {
    setFilterData(data);
    setAgeFilter("");
  };
  const columns: TableProps<DataTypeTable>["columns"] = [
    {
      title: "Stt",
      dataIndex: "stt",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a className="font-semibold">{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  useEffect(() => {
    let isMounted = true;
    const verifyUser = async () => {
      try {
        const user = await getUserCookie();
        if (isMounted) {
          if (!user || !allowedEmails.includes(user.email)) router.replace("/");
          else setNameUser(user.name);
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
        if (isMounted) router.replace("/");
      }
    };

    verifyUser();

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) verifyUser();
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      isMounted = false;
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [router]);
  return (
    <div className="min-h-screen w-full to-blue-50/30">
      <Navbar />
      <div className="mx-auto mt-22 w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
        <section className="rounded-2xl p-6 shadow-sm sm:p-8 bg-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
            Panda Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            Xin chào, {nameUser}
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Theo dõi nhanh hoạt động lớp, điểm danh và quản lý học viên mới tại
            một nơi.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Tổng học viên mẫu
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{data.length}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Sau khi lọc
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {filterData.length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                Bộ lọc hiện tại
              </p>
              <p className="mt-2 text-lg font-bold text-slate-900">
                {ageFilter ? `< ${ageFilter}` : "Chưa áp dụng"}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <button
            onClick={() => open("modalA")}
            className="rounded-2xl border border-blue-200 bg-linear-to-r from-blue-600 to-indigo-700 p-6 text-left text-white shadow-sm transition hover:-translate-y-0.5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-blue-100">
              Attendance
            </p>
            <h2 className="mt-2 text-xl font-bold">Mở điểm danh khuôn mặt</h2>
            <p className="mt-2 text-sm text-blue-100">
              Bắt đầu camera để nhận diện học viên trong buổi tập.
            </p>
          </button>
          <button
            onClick={() => open("modalB")}
            className="rounded-2xl border border-emerald-200 bg-linear-to-r from-emerald-600 to-teal-600 p-6 text-left text-white shadow-sm transition hover:-translate-y-0.5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">
              Registration
            </p>
            <h2 className="mt-2 text-xl font-bold">Thêm học sinh mới</h2>
            <p className="mt-2 text-sm text-emerald-100">
              Nhập thông tin và quét khuôn mặt để tạo hồ sơ mới.
            </p>
          </button>
        </section>

        <Modal
          title="Điểm danh"
          closable={true}
          open={modals.modalA}
          onCancel={() => close("modalA")}
          footer={null}
          width={760}
        >
          <TakeAttendance />
        </Modal>
        <Modal
          title="Thêm học sinh mới"
          closable={true}
          open={modals.modalB}
          onCancel={() => close("modalB")}
          footer={null}
          width={760}
        >
          <RegisterStudent />
        </Modal>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Tổng quan đi/nghỉ tập của lớp
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Dữ liệu mẫu để theo dõi và lọc nhanh theo số buổi.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Input
                type="number"
                value={ageFilter}
                onChange={handleFilterChange}
                placeholder="Nhập số buổi học để lọc"
                className="w-56"
              />
              <Button type="primary" onClick={handleFilter}>
                Lọc
              </Button>
              <Button onClick={handleReset} color="danger" variant="outlined">
                Bỏ lọc
              </Button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={filterData}
            pagination={{ pageSize: 5 }}
            rowKey="key"
            className="mt-5"
          />
        </section>
      </div>
    </div>
  );
}
