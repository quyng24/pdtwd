"use client";

import { DatePicker, Input } from "antd";
import CameraCapture from "./CameraCapture";
import { useState, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { message } from "antd";
import { createStudent } from "../services/registerStudent";
import { StudentsType } from "../types/type";

export default function RegisterStudent() {
  const [messageApi, contextHolder] = message.useMessage();
  const [nameStudent, setNameUser] = useState<string>("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const submittingRef = useRef(false);

  const handleFaceCaptured = async (base64: string) => {
    if (submittingRef.current) return;
    if (!base64 || !birthday || !nameStudent) return;

    submittingRef.current = true;

    const payload = {
      name: nameStudent,
      birthday: birthday.format("YYYY-MM-DD"),
      image_base64: base64,
    };

    try {
      const res = await createStudent(payload as StudentsType);
      if (res) {
        messageApi.open({
          type: "success",
          content: "Đã thêm học sinh mới thành công!",
        });
        setNameUser("");
        setBirthday(null);
      }
    } catch (err: unknown) {
      function hasResponse(
        e: unknown
      ): e is { response?: { status?: number; data?: { detail?: string } } } {
        return typeof e === "object" && e !== null && "response" in e;
      }

      if (hasResponse(err)) {
        const status = err.response?.status;
        const detail = err.response?.data?.detail;

        if (status === 400) {
          message.error(
            detail || "Ảnh không hợp lệ hoặc không phát hiện khuôn mặt"
          );
        } else if (status === 409) {
          message.warning("Khuôn mặt đã tồn tại trong hệ thống");
        } else {
          message.error("Lỗi hệ thống");
        }
      } else {
        message.error("Lỗi hệ thống");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {contextHolder}
      <Input
        placeholder="Nhập họ tên học sinh"
        value={nameStudent}
        onChange={(e) => setNameUser(e.target.value)}
        type="text"
      />
      <DatePicker
        format="YYYY-MM-DD"
        onChange={(date) => setBirthday(date)}
        value={birthday}
      />
      <CameraCapture
        onFaceCaptured={handleFaceCaptured}
        showPreview={true}
        autoCloseAfterCapture={true}
      />
    </div>
  );
}
