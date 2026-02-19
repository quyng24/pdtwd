"use client";

import { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";
import { DataTypeTable } from "../types/type";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
    ChevronLeft,
    ChevronRight,
    Search,
    Clock,
    FilterX
} from "lucide-react";

type TableLogProps = {
    data: DataTypeTable[];
    ageFilter: string;
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
};

export default function TableLog({
    data,
    ageFilter,
    handleFilterChange,
    handleReset,
}: TableLogProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const filteredData = useMemo(() => {
        if (!ageFilter) return data;
        return data.filter((item) =>
            item.student_name.toLowerCase().includes(ageFilter.toLowerCase())
        );
    }, [data, ageFilter]);

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [filteredData, currentPage]);

    useEffect(() => { setCurrentPage(1); }, [ageFilter]);

    return (
        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
            {/* Search & Filter Header */}
            <div className="flex flex-col space-y-4 border-b border-slate-100 bg-slate-50/30 p-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        Nhật ký điểm danh
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Cập nhật theo thời gian thực từ AI Camera</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                            value={ageFilter}
                            onChange={handleFilterChange}
                            placeholder="Tìm võ sinh..."
                            className="h-10 w-full rounded-full border-slate-200 pl-10 pr-4 transition-all focus:ring-2 focus:ring-blue-500 sm:w-64"
                        />
                    </div>
                    {ageFilter && (
                        <Button variant="ghost" size="icon" onClick={handleReset} className="rounded-full text-slate-400 hover:text-red-500">
                            <FilterX className="h-5 w-5" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Modern Table */}
            <div className="p-2">
                <Table>
                    <TableHeader className="bg-transparent">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="w-16 text-center font-bold text-slate-400 uppercase text-[10px] tracking-widest">No.</TableHead>
                            <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest">Võ sinh</TableHead>
                            <TableHead className="text-right font-bold text-slate-400 uppercase text-[10px] tracking-widest">Thời gian vào lớp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => {
                                const isToday = dayjs(item.checkin_time).isSame(dayjs(), 'day');
                                return (
                                    <TableRow key={item.id || index} className="group transition-colors hover:bg-blue-50/40 border-slate-50">
                                        <TableCell className="text-center">
                                            <span className="text-sm font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
                                                {String((currentPage - 1) * pageSize + index + 1).padStart(2, '0')}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-700">{item.student_name}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex flex-col items-end">
                                                <Badge variant={isToday ? "default" : "secondary"} className={`rounded-full px-2 py-0 text-[10px] ${isToday ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}>
                                                    {isToday ? "Hôm nay" : dayjs(item.checkin_time).format("DD/MM/YYYY")}
                                                </Badge>
                                                <span className="mt-1 text-sm font-mono font-medium text-slate-600">
                                                    {dayjs(item.checkin_time).format("HH:mm:ss")}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="h-40 text-center">
                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                        <Search className="h-8 w-8 opacity-20 mb-2" />
                                        <p className="text-sm">Không tìm thấy dữ liệu phù hợp</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Style */}
            <div className="flex items-center justify-between bg-slate-50/50 p-4 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-tighter">
                    Trang {currentPage} trên {totalPages || 1}
                </p>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => p - 1)}
                        disabled={currentPage === 1}
                        className="rounded-xl h-8 w-8 p-0"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="rounded-xl h-8 w-8 p-0"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}