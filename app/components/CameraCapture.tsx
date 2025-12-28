import { Button } from "antd";
import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { CameraCaptureProps } from "../types/type";

export default function CameraCapture({
  onFaceCaptured,
  buttonTextOff = "Mở Camera & Quét Khuôn Mặt",
  buttonTextOn = "Tắt Camera",
  showPreview = false,
  autoCloseAfterCapture = false,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasCapturedRef = useRef(false);

  const loadModels = async () => {
    const MODEL_URL = "/models/tiny_face_detector";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  };

  const startDetection = async () => {
    if (!videoRef.current || intervalRef.current) return;

    const detection = await faceapi.detectSingleFace(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (detection) {
      hasCapturedRef.current = true;
      await captureSnapshot(); // 🔥 await
      return;
    }

    requestAnimationFrame(startDetection);
  };

  const stopDetection = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const openCamera = async () => {
    try {
      hasCapturedRef.current = false;
      setLoading(true);
      await loadModels();

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsCameraOn(true);
      startDetection();
    } catch (error) {
      console.error("Lỗi mở camera:", error);
      alert("Không thể mở camera. Vui lòng kiểm tra quyền truy cập.");
    } finally {
      setLoading(false);
    }
  };

  const closeCamera = () => {
    stopDetection();
    stopCameraStream();
    setIsCameraOn(false);
    setLoading(false);
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      closeCamera();
    } else {
      openCamera();
    }
  };

  useEffect(() => {
    return () => {
      closeCamera();
    };
  }, []);

  const captureSnapshot = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL("image/jpeg");
    await onFaceCaptured(base64);
    if (autoCloseAfterCapture) {
      closeCamera();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        type="primary"
        onClick={toggleCamera}
        loading={loading}
        danger={isCameraOn}
      >
        {isCameraOn ? buttonTextOn : buttonTextOff}
      </Button>

      {loading && <p>Đang xử lý camera...</p>}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "400px",
          marginTop: "20px",
          border: "2px solid #ccc",
          borderRadius: "8px",
          display: isCameraOn && showPreview ? "block" : "none",
        }}
      />
    </div>
  );
}
