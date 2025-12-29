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
      console.log(res);
      if (res.status === 201) {
        messageApi.open({
          type: "success",
          content: "+1 võ sinh!",
        });
        setNameUser("");
        setBirthday(null);
      } else if (res.status === 409) {
        messageApi.open({
          type: "error",
          content: "x2 học sinh, làm 2 lần rồi!",
        });
        setNameUser("");
        setBirthday(null);
      } else {
        messageApi.open({ type: "error", content: "Ôi thôi chếck lỗi rồi!" });
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      submittingRef.current = false;
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
