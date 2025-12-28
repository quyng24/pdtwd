"use client";

import CameraCapture from "./CameraCapture";

export default function TakeAttendance() {
  const handleFaceCaptured = (base64: string) => {
    console.log(base64);
  };
  return (
    <>
      <CameraCapture
        onFaceCaptured={handleFaceCaptured}
        showPreview={true}
        buttonTextOff="Bắt đầu điểm danh"
        buttonTextOn="Kết thúc điểm danh"
      />
    </>
  );
}
