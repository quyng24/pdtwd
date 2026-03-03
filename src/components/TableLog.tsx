"use client";

import { useState, useMemo, useEffect } from "react";
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
    totalWeeks: number;
    ageFilter: string;
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleReset: () => void;
};

export default function TableLog({
    data,
    totalWeeks,
    ageFilter,
    handleFilterChange,
    handleReset,
}: TableLogProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const filteredData = useMemo(() => {
        if (!ageFilter) return data;
        return data.filter((item) =>
            item.name.toLowerCase().includes(ageFilter.toLowerCase())
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
            <div className="p-2 overflow-x-auto">
                <Table className="min-w-150">
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-b border-slate-100">
                            <TableHead className="w-16 text-center font-bold text-slate-400 uppercase text-[10px] tracking-widest">
                                No.
                            </TableHead>
                            <TableHead className="font-bold text-slate-400 uppercase text-[10px] tracking-widest min-w-37">
                                Võ sinh
                            </TableHead>

                            {paginatedData.length > 0 && Object.keys(paginatedData[0].weeks).map((weekKey) => (
                                <TableHead key={weekKey} className="text-center font-bold text-slate-400 uppercase text-[10px] tracking-widest border-l border-slate-50">
                                    {weekKey.replace("week_", "Tuần ")}
                                </TableHead>
                            ))}

                            <TableHead className="text-center font-bold text-red-400 uppercase text-[10px] tracking-widest border-l border-slate-50">
                                Nghỉ
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, index) => {
                                const getCurrentWeekOfMonth = () => {
                                    const today = new Date();
                                    const day = today.getDate();
                                    return Math.ceil(day / 7);
                                };
                                const currentWeekNum = getCurrentWeekOfMonth();
                                const absentCount = Object.entries(item.weeks).reduce((count, [key, value]) => {
                                    const weekIndex = parseInt(key.split('_')[1]);
                                    if (value === 0 && weekIndex <= currentWeekNum) {
                                        return count + 1;
                                    }
                                    return count;
                                }, 0);

                                return (
                                    <TableRow key={item.student_id || index} className="group hover:bg-blue-50/40 border-slate-50">
                                        <TableCell className="text-center">
                                            <span className="text-sm font-medium text-slate-400">
                                                {String((currentPage - 1) * pageSize + index + 1).padStart(2, '0')}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-bold text-slate-700">{item.name}</span>
                                        </TableCell>

                                        {Object.entries(item.weeks).map(([key, value]) => (
                                            <TableCell key={key} className="text-center border-l border-slate-50/50">
                                                <span className={`text-sm ${value > 0 ? 'text-blue-600 font-semibold' : 'text-slate-300'}`}>
                                                    {value > 0 ? value : "-"}
                                                </span>
                                            </TableCell>
                                        ))}

                                        <TableCell className="text-center border-l border-slate-50 bg-red-50/20">
                                            <span className="text-sm font-bold text-red-500">
                                                {absentCount}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={10} className="h-40 text-center">
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
