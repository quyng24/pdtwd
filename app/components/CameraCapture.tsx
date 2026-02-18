"use client";

import * as faceapi from "face-api.js";
import React, { memo, useEffect, useRef, useState, useCallback } from "react";

type RegisterProps = {
  mode: "register";
  onFaceCaptured: (embedding: number[][])
    => Promise<boolean | void> | boolean | void;
  onScanComplete: () => void;
};

type AttendanceProps = {
  mode: "attendance";
  onFaceCaptured: (embedding: number[])
    => Promise<boolean | void> | boolean | void;
  onScanComplete?: () => void;
};

type Props = RegisterProps | AttendanceProps;

declare global {
  interface Window {
    FaceDetection: any;
    Camera: any;
  }
}

const CameraCapture = memo(({ onFaceCaptured, mode, onScanComplete }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [running, setRunning] = useState(true);
  const [cameraReady, setCameraReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const capturedVectorsRef = useRef<number[][]>([]);
  const isProcessingRef = useRef(false);
  const lastCaptureTimeRef = useRef(0);
  const cameraInstance = useRef<any>(null);

  useEffect(() => {
    const loadDependencies = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);

      const scripts = [
        "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/face_detection.js",
        "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
      ];

      for (const src of scripts) {
        if (!document.querySelector(`script[src="${src}"]`)) {
          const script = document.createElement("script");
          script.src = src;
          script.async = true;
          document.body.appendChild(script);
          await new Promise((res) => (script.onload = res));
        }
      }
      initMediaPipe();
    };

    loadDependencies();

    return () => {
      if (cameraInstance.current) cameraInstance.current.stop();
    };
  }, []);

  const initMediaPipe = useCallback(() => {
    if (!videoRef.current || !window.FaceDetection || !window.Camera) return;

    const faceDetection = new window.FaceDetection({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    });

    faceDetection.setOptions({
      model: "short",
      minDetectionConfidence: 0.7,
    });

    faceDetection.onResults(async (results: any) => {
      if (!running || isProcessingRef.current || !videoRef.current) return;

      if (results.detections.length > 0) {
        const now = Date.now();
        const delay = mode === "register" ? 600 : 1500;
        if (now - lastCaptureTimeRef.current < delay) return;

        isProcessingRef.current = true;
        try {
          const descriptor = await faceapi.computeFaceDescriptor(videoRef.current);
          if (descriptor) {
            const vector = Array.from(descriptor as Float32Array);
            if (mode === "attendance") {
              await onFaceCaptured(vector);
            } else {
              capturedVectorsRef.current.push(vector);
              setProgress(capturedVectorsRef.current.length);
              if (capturedVectorsRef.current.length >= 5) {
                const success = await onFaceCaptured(capturedVectorsRef.current);
                if (success !== false) {
                  setRunning(false);

                  if (cameraInstance.current) {
                    cameraInstance.current.stop();
                  }

                  onScanComplete?.();
                }
                else {
                  capturedVectorsRef.current = [];
                  setProgress(0);
                }
              }
            }
          }
        } finally {
          lastCaptureTimeRef.current = Date.now();
          isProcessingRef.current = false;
        }
      }
    });

    cameraInstance.current = new window.Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) await faceDetection.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    cameraInstance.current.start().then(() => setCameraReady(true));
  }, [mode, onFaceCaptured, running]);

  return (
    <div className="w-full bg-white p-2 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100">
      <div className="mb-2 flex justify-between items-center px-1">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${running ? "bg-green-500 animate-pulse" : "bg-slate-300"}`} />
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            AI Recognition
          </span>
        </div>
        {mode === "register" && progress > 0 && (
          <span className="text-[9px] sm:text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 mr-5 rounded-lg">
            {progress}/5
          </span>
        )}
      </div>

      <div className="relative aspect-square sm:aspect-video h-auto max-h-[40vh] sm:max-h-none rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
        <video
          ref={videoRef}
          className="h-full w-full object-cover scale-x-[-1]"
          playsInline
          muted
        />

        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-[9px] text-slate-400 font-medium uppercase">Loading AI...</p>
            </div>
          </div>
        )}

        {running && cameraReady && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* Khung quét nhỏ hơn trên mobile */}
            <div className={`w-[90%] h-[90%] border-2 border-dashed rounded transition-all duration-500 ${progress > 0 ? "border-green-400 scale-105" : "border-white/30"
              }`} />
          </div>
        )}
      </div>
    </div>
  );
});

CameraCapture.displayName = "CameraCapture";
export default CameraCapture;