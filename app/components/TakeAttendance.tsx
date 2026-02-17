"use client";

import { attendanceStudentApi } from "../services/student";
import CameraCapture from "./CameraCapture";
import { useRef, useCallback } from "react";
import { message } from "antd";

export default function TakeAttendance() {
  const [messageApi, contextHolder] = message.useMessage();
  const isProcessingRef = useRef(false);
  const cooldownRef = useRef<number>(0);
  const lastStudentRef = useRef<string | null>(null);

  const COOLDOWN_TIME = 5000;

  const handleFaceCaptured = useCallback(async (vector: number[]) => {
    const now = Date.now();
    if (isProcessingRef.current) return;
    if (now < cooldownRef.current) return;
    try {
      isProcessingRef.current = true;

      const res = await attendanceStudentApi({ face_vector: vector });

      if (res?.status === 200) {
        const studentId = res.data.id;
        const now = Date.now();

        const isSameStudent = studentId === lastStudentRef.current;
        const isTooSoon = now - (cooldownRef.current - COOLDOWN_TIME) < 60000; // 1 phút

        if (isSameStudent && isTooSoon) return;

        lastStudentRef.current = studentId;
        cooldownRef.current = now + COOLDOWN_TIME;
        messageApi.success(`${res.message}: ${res.data.name}`);
      } else {
        messageApi.error("Ai đây tôi không quen bro!");
      }
    } catch (err) {
      cooldownRef.current = now + 2000;
      console.log("No match");
    } finally {
      isProcessingRef.current = false;
    }
  }, [messageApi]);
  return (
    <>
      {contextHolder}
      <CameraCapture
        onFaceCaptured={handleFaceCaptured}
        mode="attendance"
      />
    </>
  );
}
