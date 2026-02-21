"use client"

import { useState, useCallback } from "react"; // 1. Thêm useCallback
import { DatePicker, Input, message } from "antd";
import { Dayjs } from "dayjs";

import FaceRecognition from "./FaceRecognition";
import { createStudentApi } from "@/services/student";
import { StudentsType } from "@/types/type";

export default function RegisterStudent() {
  const [messageApi, contextHolder] = message.useMessage();
  const [studentName, setStudentName] = useState<string>("");
  const [birthday, setBirthday] = useState<Dayjs | null>(null);

  const handleEmbeddingsReady = useCallback(async (embeddings: Float32Array[]) => {
    if (!studentName || !birthday) {
      messageApi.warning("Vui lòng nhập đầy đủ thông tin trước khi quét mặt");
      return;
    }
    try {
      const birthdayStr: string = birthday ? birthday.format("YYYY-MM-DD") : "";
      const embeddingSrt = embeddings.map(float32Arr => Array.from(float32Arr));
      const payload: StudentsType = { name: studentName, birthday: birthdayStr, face_vectors: embeddingSrt };

      const response = await createStudentApi(payload);
      if (response.status === 201) {
        messageApi.success(response.message);
        setStudentName("");
        setBirthday(null);
      } else if (response.status === 409) {
        messageApi.error(response.message);
      }
    } catch (error: any) {
      console.error("Lỗi đăng ký:", error);
      messageApi.error("Ôi thôi chết! Tôi bị lỗi rồi");
    }
  }, [studentName, birthday, messageApi]);

  const handleError = useCallback((msg: string) => {
    messageApi.error(msg);
  }, [messageApi]);

  const handleComplete = useCallback(() => {
    console.log('Quá trình enroll hoàn tất, camera đã tắt');
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {contextHolder}
      <div className="space-y-6">
        {/* Form Group */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Họ tên võ sinh
            </label>
            <Input
              placeholder="Nguyễn Văn A"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:bg-white transition-all shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Ngày sinh
            </label>
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Chọn ngày"
              onChange={(date) => setBirthday(date)}
              value={birthday}
              className="w-full h-11 rounded-xl border-slate-200 bg-slate-50/50 shadow-sm"
            />
          </div>
        </div>

        {/* Face Recognition Section */}
        <div className="pt-2 border-t border-slate-100">
          <div className="mb-4">
            <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
              Xác thực khuôn mặt
            </h3>
          </div>
          <FaceRecognition
            mode="enroll"
            onEmbeddingsReady={handleEmbeddingsReady}
            onError={handleError}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </div>
  );
}