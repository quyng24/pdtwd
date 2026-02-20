"use client";

import { attendanceStudentApi } from "../services/attendance";
import CameraCapture from "./CameraCapture";
import { useRef, useCallback } from "react";
import { message } from "antd";

export default function TakeAttendance() {
  const [messageApi, contextHolder] = message.useMessage();
  const isProcessingRef = useRef(false);

  const lastLogsRef = useRef<Record<string, number>>({});
  const globalThrottleRef = useRef<number>(0);

  const handleFaceCaptured = useCallback(async (vector: number[] | number[][]) => {
    const now = Date.now();
    if (isProcessingRef.current) return;
    if (now < globalThrottleRef.current) return;
    try {
      isProcessingRef.current = true;
      const faceVector: number[] = Array.isArray(vector[0])
        ? (vector as number[][])[0]
        : (vector as number[]);

      if (!faceVector || faceVector.length === 0) {
        throw new Error("Empty face vector");
      }

      const res = await attendanceStudentApi({ face_vector: faceVector });

      if (res?.status === 200) {
        const studentId = res.data.id;
        const lastTime = lastLogsRef.current[studentId] || 0;

        if (now - lastTime < 60000) {
          console.log(`Chặn spam cho: ${res.data.name}`);
          return;
        }

        lastLogsRef.current[studentId] = now;
        globalThrottleRef.current = now + 3000;

        messageApi.success(`${res.message} ${res.data.name}`);

      } else if (res.status === 202) {
        messageApi.success(`${res.message} ${res.data.name} ơi!`);
      }
    } catch (err) {
      globalThrottleRef.current = now + 2000;
      messageApi.error("Ai đây tôi không quen bro!");
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
        onScanComplete={() => { }}
      />
    </>
  );
}
