"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Navbar from "../components/Navbar";
import { getUserCookie } from "../lib/cookies";
import { allowedEmails } from "../lib/auth";
import { useRouter } from "next/navigation";
import { Button, Input, Table } from "antd";
import type { TableProps } from 'antd';
import { DataTypeTable, initialData } from "../types/type";


export default function AdminDashboard() {
  const router = useRouter();
  const [nameUser, setNameUser] = useState<string | undefined>("");
  const [ageFilter, setAgeFilter] = useState(''); // Trạng thái lưu giá trị filter
  const [data, setData] = useState<DataTypeTable[]>(initialData);
  const [filterData, setFilterData] = useState<DataTypeTable[]>(initialData);

  // Hàm xử lý khi người dùng nhập giá trị vào filter
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgeFilter(e.target.value);
  };

  // Hàm xử lý lọc dữ liệu khi người dùng nhấn nút "Lọc"
  const handleFilter = () => {
    const filteredData = data.filter(item => item.age < parseInt(ageFilter, 10));
    setFilterData(filteredData);
  };
  const handleReset = () => {
    setFilterData(data);
    setAgeFilter('');
  };
  const columns: TableProps<DataTypeTable>['columns'] = [
    {
      title: 'Stt',
      dataIndex: 'stt',
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a className="font-semibold">{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  useEffect(() => {
    let isMouted = true;
    const fetchData = async () => {
      try {
        const user = await getUserCookie();
        if (isMouted) {
          if (!user || !allowedEmails.includes(user.email)) router.push("/");
          else setNameUser(user.name);
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };
    fetchData();
    return () => {
      isMouted = false;
    };
  }, [router]);
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="w-full h-full px-10 sm:px-16 md:px-20 py-5 lg:py-10 mt-[88px]">

        {/* Text welcome */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          Xin chào, {nameUser}
        </h2>
        {/* Button action */}
        <div className="w-full flex items-center gap-2 md:gap-10 mt-10">
          <Button type="primary">Bắt đầu điểm danh</Button>
          <Button type="primary">Thêm học sinh mới</Button>
        </div>

        {/**Table */}
        <div className="mt-10">
          <h3 className="font-semibold text-black text-lg md:text-xl lg:text-2xl">Tổng quan đi/nghỉ tập của lớp</h3>
          <div className="w-full flex items-center justify-between gap-2 py-5">
            <Button onClick={handleReset} color="danger" variant="outlined">Bỏ lọc</Button>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={ageFilter}
                onChange={handleFilterChange}
                placeholder="Nhập số buổi học để lọc"
              />
              <Button type="primary" onClick={handleFilter}>
                Lọc
              </Button>
            </div>
          </div>
          <Table columns={columns} dataSource={filterData} pagination={{ pageSize: 5 }}/>
        </div>
      </div>
    </div>
  );
}
