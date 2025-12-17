"use client";

import { Button } from "antd";
import { useEffect, useRef, useState } from "react";

export default function CameraCapture({
  onCapture,
}: {
  onCapture: (img: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const captureSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL();

    setPreview(base64);
    onCapture(base64);
  };
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Cannot open camera: ", error);
      }
    }
  }, []);
  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full rounded"
      ></video>
      <canvas ref={canvasRef} className="hidden"></canvas>
      <Button type="primary" onClick={captureSnapshot}>
        Capture
      </Button>
    </div>
  );
}
