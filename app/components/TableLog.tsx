import { Table, Button, Input } from "antd";
import type { TableProps } from "antd";
import dayjs from "dayjs";

import { DataTypeTable } from "../types/type";

type TableLogProps = {
    data: DataTypeTable[],
    ageFilter: any,
    filterData: DataTypeTable[],
    handleFilterChange: (e: any) => void,
    handleFilter: () => void,
    handleReset: () => void
}


export default function TableLog({ data, ageFilter, filterData, handleFilterChange, handleFilter, handleReset }: TableLogProps) {

    const columns: TableProps<DataTypeTable>["columns"] = [
        {
            title: "Stt",
            dataIndex: "stt",
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: "Name",
            dataIndex: "student_name",
            key: "student_name",
            render: (text) => <a className="font-semibold">{text}</a>,
        },
        {
            title: "Time",
            dataIndex: "checkin_time",
            key: "checkin_time",
            render: (time) => <p>{dayjs(time).format("DD/MM/YYYY HH:mm")}</p>
        },
    ];

    return (
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
    )
}