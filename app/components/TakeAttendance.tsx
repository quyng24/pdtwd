"use client";

import CameraCapture from "./CameraCapture";
import { useState } from "react";

export default function TakeAttendance() {
  const [imgBase64, setImgBase64] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const check = () => {
    if (!imgBase64) return alert("Chưa chụp ảnh!");
    console.log(imgBase64);
    alert("Capture success!");
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Điểm danh</h2>
      <CameraCapture onCapture={(img) => setImgBase64(img)} />
      <button
        onClick={check}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Xác thực điểm danh
      </button>

      {result && <p className="mt-3 text-lg font-bold">{result}</p>}
    </div>
  );
}
