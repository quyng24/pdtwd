"use client"

import { Button } from "antd"
import { useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceCheckButton() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [loading, setLoading] = useState(false);


    const loadModels = async () => {
        const MODEL_URL = "/models/tiny_face_detector"; // Bạn phải tạo public/models và để model vào
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    };
    const openCamera = async () => {
        try {
        setLoading(true);

        await loadModels();

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
        }

        detectFace();
        } catch (error) {
        console.error("Lỗi mở camera:", error);
        setLoading(false);
        }
    };
    const detectFace = async () => {
        if (!videoRef.current) return;

        const interval = setInterval(async () => {
        const video = videoRef.current!;

        const detection = await faceapi.detectSingleFace(
            video,
            new faceapi.TinyFaceDetectorOptions()
        );

        if (detection) {
            clearInterval(interval);
            captureSnapshot();
        }
        }, 300);
    };
    const captureSnapshot = () => {
        if (!videoRef.current) return;

        const video = videoRef.current;
        const canvas = document.createElement("canvas");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64 = canvas.toDataURL("image/jpeg");

        console.log("📸 Ảnh Base64:", base64);

        alert("Đã phát hiện khuôn mặt và chụp ảnh! Xem console log.");
    };
    return (
    <div style={{ textAlign: "center" }}>
      <Button type="primary" onClick={openCamera}>{loading ? "Đang mở camera..." : "Mở camera & Quét khuôn mặt"}</Button>

      {/* Hidden video */}
      <video
        ref={videoRef}
        style={{
          width: "300px",
          marginTop: "20px",
          display: "none",
        }}
      ></video>
    </div>
  );
}