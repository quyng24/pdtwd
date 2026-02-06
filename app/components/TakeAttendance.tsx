"use client";

import CameraCapture from "./CameraCapture";

export default function TakeAttendance() {
  const handleFaceCaptured = (vector: number[]) => {
    console.log(vector);
  };
  return (
    <>
      <CameraCapture
        onFaceCaptured={handleFaceCaptured}
        mode="attendance"
      />
    </>
  );
}
