import { useState } from "react";
import CameraCapture from "./CameraCapture";

export default function RegisterStudent() {
  const [nameStudent, setNameStudent] = useState<string>();
  const [imgBase64, setImgBase64] = useState("");

  const submit = () => {
    if (!imgBase64) return alert("Chưa chụp ảnh!");
    console.log(nameStudent, imgBase64);
    alert("Capture success!");
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Thêm học sinh mới</h2>

      <input
        className="border p-2 rounded mb-4"
        placeholder="Tên học sinh"
        onChange={(e) => setNameStudent(e.target.value)}
      />

      <CameraCapture onCapture={(img) => setImgBase64(img)} />

      <button
        onClick={submit}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Lưu học sinh
      </button>
    </div>
  );
}
