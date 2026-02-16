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
  const [cameraReady, setCameraReady] = useState(false);
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
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraReady(false);
      }
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
    setCameraReady(false);
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
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          {mode === "register" ? "Face Register" : "Attendance Scan"}
        </span>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
            running
              ? "bg-emerald-50 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              running ? "animate-pulse bg-emerald-500" : "bg-slate-400"
            }`}
          />
          {running ? "Đang quét" : "Đã dừng"}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-black">
        <div className="aspect-video w-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onLoadedData={() => setCameraReady(true)}
            className="h-full w-full object-cover"
          />
        </div>

        {!cameraReady && running && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/75">
            <p className="text-sm font-medium text-slate-100">Đang khởi động camera...</p>
          </div>
        )}

        {running && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[60%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-3xl border-2 border-cyan-300/80 shadow-[0_0_30px_rgba(56,189,248,0.35)]" />
          </div>
        )}
      </div>

      {mode === "attendance" && (
        <div className="mt-4 flex justify-center">
          <button
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
              running
                ? "bg-red-500 hover:bg-red-600"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
            onClick={async () => {
              if (running) {
                setRunning(false);
                stopCamera();
                return;
              }

              await startCamera();
              setRunning(true);
            }}
          >
            {running ? "Tắt camera" : "Bật camera"}
          </button>
        </div>
      )}
    </div>
  );
});

CameraCapture.displayName = "CameraCapture";

export default CameraCapture;
