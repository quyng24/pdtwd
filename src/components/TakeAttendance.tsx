"use client";

import { attendanceStudentApi } from "../services/attendance";
import { useRef } from "react";
import { message } from "antd";
import FaceRecognition from "./FaceRecognition";

export default function TakeAttendance() {
  const [messageApi, contextHolder] = message.useMessage();
  const isProcessingBus = useRef(false);

  const handleEmbeddingReady = async (embedding: Float32Array) => {
    if (isProcessingBus.current) return;
    try {
      isProcessingBus.current = true;

      const embeddingSrt = Array.from(embedding);
      const result = await attendanceStudentApi({ face_vector: embeddingSrt });

      if (result.status === 200) messageApi.success(`${result.message} ${result.data.name}!`);
      else if (result.status === 202) messageApi.error(`${result.message}`);
      else if (result.status === 404) messageApi.error(`${result.message}`);
    } catch (error) {
      console.error("Lỗi điểm danh:", error);
      messageApi.error("Lỗi kết nối hệ thống!");
    } finally {
      setTimeout(() => {
        isProcessingBus.current = false;
      }, 2000);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center justify-center p-4">
        <FaceRecognition mode="attendance" onEmbeddingReady={handleEmbeddingReady} />

        {/* Tip: Thêm một dòng chữ nhỏ nhắc nhở người dùng */}
        <p className="mt-4 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
          Giữ mặt thẳng ống kính để điểm danh
        </p>
      </div>
    </>
  );
}
