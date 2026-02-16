"use client";

import * as faceapi from "face-api.js";
import { memo, useEffect, useRef, useState } from "react";

type Props = {
  onFaceCaptured: (embedding: number[]) => Promise<boolean | void> | boolean | void;
  mode: "register" | "attendance";
};

const CameraCapture = memo(({ onFaceCaptured, mode }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [running, setRunning] = useState(true);
  const lastEmitRef = useRef(0);

  // load models
  useEffect(() => {
    const load = async () => {
      const MODEL_URL = "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);

      startCamera();
    };

    load();

    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Không thể mở camera", error);
    }
  };

  const stopCamera = () => {
    if (!videoRef.current?.srcObject) return;
    videoRef.current.pause();
    (videoRef.current.srcObject as MediaStream)
      .getTracks()
      .forEach((t) => t.stop());
    videoRef.current.srcObject = null;
  };

  // detect loop
  useEffect(() => {
    if (!running) return;

    let rafId: number | null = null;
    let lastRun = 0;
    let detecting = false;
    let active = true;

    const loop = async (time: number) => {
      if (!active || !videoRef.current || !running) return;
      if (videoRef.current.readyState < 2) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      if (time - lastRun < 700 || detecting) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      detecting = true;
      try {
        const result = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (result && running) {
          if (mode === "attendance") {
            const now = Date.now();
            if (now - lastEmitRef.current < 5000) {
              return;
            }
            lastEmitRef.current = now;
          }

          const vector = Array.from(result.descriptor);

          const captureResult = await onFaceCaptured(vector);

          if (mode === "register" && captureResult !== false) {
            setRunning(false);
            active = false;
            stopCamera();
          }
        }
      } finally {
        detecting = false;
        lastRun = time;
        if (active && running) {
          rafId = requestAnimationFrame(loop);
        }
      }
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [running, mode, onFaceCaptured]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* preview */}
      <video
        ref={videoRef}
        autoPlay
        muted
        width={320}
        height={240}
        className="border rounded"
      />

      {mode === "attendance" && (
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => {
            setRunning(false);
            stopCamera();
          }}
        >
          Tắt camera
        </button>
      )}
    </div>
  );
});

CameraCapture.displayName = "CameraCapture";

export default CameraCapture;
