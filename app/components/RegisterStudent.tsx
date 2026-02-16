"use client";

import { DatePicker, Input } from "antd";
import CameraCapture from "./CameraCapture";
import { useState, useRef, useCallback } from "react";
import { Dayjs } from "dayjs";
import { message } from "antd";
import { createStudent } from "../services/registerStudent";

export default function RegisterStudent() {
  const [messageApi, contextHolder] = message.useMessage();
  const [nameStudent, setNameUser] = useState<string>("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const submittingRef = useRef(false);

  const handleFaceCaptured = useCallback(
    async (vector: number[]) => {
      if (submittingRef.current) return false;

      if (!nameStudent.trim() || !birthday) {
        messageApi.warning("Vui lòng nhập tên và ngày sinh trước khi quét khuôn mặt");
        return false;
      }

      submittingRef.current = true;
      try {
        const payload = {
          name: nameStudent.trim(),
          birthday: birthday.format("YYYY-MM-DD"),
          face_vector: vector,
        };

        const response = await createStudent(payload);
        if (response) {
          messageApi.success("Đăng ký học viên thành công");
          setNameUser("");
          setBirthday(null);
          return true;
        }

        messageApi.error("Gửi dữ liệu lên server thất bại");
        return false;
      } catch (error) {
        console.error("Register student failed", error);
        messageApi.error("Đăng ký học viên thất bại");
        return false;
      } finally {
        submittingRef.current = false;
      }
    },
    [birthday, messageApi, nameStudent]
  );

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
        mode="register"
      />
    </div>
  );
}
