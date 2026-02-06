"use client";

import { DatePicker, Input } from "antd";
import CameraCapture from "./CameraCapture";
import { useState, useRef, useCallback } from "react";
import { Dayjs } from "dayjs";
import { message } from "antd";

export default function RegisterStudent() {
  const [messageApi, contextHolder] = message.useMessage();
  const [nameStudent, setNameUser] = useState<string>("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);
  const submittingRef = useRef(false);

  const handleFaceCaptured = useCallback(async (vector: any) => {
    console.log("Payload to submit:", vector);
  }, []);

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