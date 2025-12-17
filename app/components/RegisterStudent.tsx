"use client";

import { Input } from "antd";
import CameraCapture from "./CameraCapture";
import { useState } from "react";

export default function RegisterStudent() {
  const [nameStudent, setNameUser] = useState<string>("");

  const handleFaceCaptured = (base64: string) => {
    // Ở đây bạn tự do xử lý: call API, lưu state, hiển thị ảnh, v.v.
    if (base64) {
      console.log({ name: nameStudent, image_base64: base64 });
      setNameUser("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Input
        placeholder="Nhập họ tên học sinh"
        value={nameStudent}
        onChange={(e) => setNameUser(e.target.value)}
        type="text"
      />
      <CameraCapture
        onFaceCaptured={handleFaceCaptured}
        showPreview={true}
        autoCloseAfterCapture={true}
      />
    </div>
  );
}
