"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as faceapi from 'face-api.js';

interface FaceRecognitionProps {
    mode: 'enroll' | 'attendance';
    onEmbeddingsReady?: (embeddings: Float32Array[]) => void;
    onEmbeddingReady?: (embedding: Float32Array) => void;
    onError?: (msg: string) => void;
    onComplete?: () => void;
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({
    mode,
    onEmbeddingsReady,
    onEmbeddingReady,
    onError,
    onComplete,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [status, setStatus] = useState<string>('Hệ thống sẵn sàng');
    const [frameCount, setFrameCount] = useState(0);
    const [detectState, setDetectState] = useState<'none' | 'detected' | 'success' | 'cooldown'>('none');
    const [cooldownTime, setCooldownTime] = useState(0);

    const stopScanning = useCallback(() => {
        setIsScanning(false);
        setDetectState('none');
        setFrameCount(0);
        setCooldownTime(0);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        onComplete?.();
    }, [onComplete]);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const MODEL_URL = "/models";
                await Promise.all([
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
                ]);
                setModelsLoaded(true);
            } catch (err) {
                onError?.('Ôi thôi chết, Lỗi tải dữ liệu AI');
            }
        };
        loadModels();
        return () => stopScanning();
    }, [stopScanning, onError]);

    const handleToggle = async () => {
        if (isScanning) {
            stopScanning();
            setStatus('Đã tắt camera');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480, facingMode: 'user' }
            });
            streamRef.current = stream;
            if (videoRef.current) videoRef.current.srcObject = stream;
            setIsScanning(true);
            startProcessing();
        } catch (err) {
            onError?.('Không thể mở camera');
        }
    };

    const startProcessing = () => {
        let collected: Float32Array[] = [];
        let isWaiting = false;
        let isDone = false;

        setStatus(mode === 'enroll' ? 'Đang lấy dữ liệu...' : 'Đang quét điểm danh...');

        intervalRef.current = setInterval(async () => {
            if (!videoRef.current || isWaiting || isDone) return;

            const detection = await faceapi
                .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (detection && detection.detection.score > 0.6) {
                if (mode === 'enroll') {
                    setDetectState('success');
                    collected.push(detection.descriptor);
                    setFrameCount(collected.length);
                    if (collected.length >= 10) {
                        isDone = true;
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                            intervalRef.current = null;
                        }
                        setStatus('Đăng ký hoàn tất!');
                        onEmbeddingsReady?.(collected);

                        setTimeout(() => stopScanning(), 500);
                    }
                } else {
                    isWaiting = true;
                    setDetectState('success');
                    setStatus('Xác thực thành công!');
                    onEmbeddingReady?.(detection.descriptor);


                    let timeLeft = 5;
                    setCooldownTime(timeLeft);

                    const countdown = setInterval(() => {
                        timeLeft -= 1;
                        setCooldownTime(timeLeft);
                        setDetectState('cooldown');
                        setStatus(`Chờ quét tiếp trong ${timeLeft}s...`);

                        if (timeLeft <= 0) {
                            clearInterval(countdown);
                            isWaiting = false;
                            setDetectState('none');
                            setStatus('Đang quét điểm danh...');
                        }
                    }, 1000);
                }
            } else {
                if (!isWaiting) setDetectState('none');
            }
        }, 250);
    };

    const getBorderColor = () => {
        if (!isScanning) return 'border-gray-200/30';
        switch (detectState) {
            case 'success': return 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]';
            case 'cooldown': return 'border-orange-400 opacity-70';
            case 'detected': return 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]';
            default: return 'border-gray-400 opacity-40';
        }
    };

    return (
        <div className="w-full bg-white">
            {/* Camera View */}
            <div className="relative overflow-hidden rounded-lg bg-gray-950 aspect-square min-w-37.5 md:min-w-50 lg:w-full max-h-37.5 md:min-h-50 lg:min-h-75 mx-auto mb-4 sm:mb-6 border-4 border-gray-50">
                <video
                    ref={videoRef}
                    autoPlay playsInline muted
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isScanning ? 'opacity-100' : 'opacity-40'}`}
                />

                {/* Visual Frame */}
                <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
                    <div className={`w-full h-full border-2 sm:border-[3px] rounded-xl transition-all duration-500 ${getBorderColor()}`}>
                        {/* Cooldown Overlay */}
                        {detectState === 'cooldown' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-[1.8rem]">
                                <span className="text-4xl sm:text-5xl font-black text-white drop-shadow-lg">{cooldownTime}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Scan Line */}
                {isScanning && detectState === 'none' && (
                    <div className="absolute inset-x-0 h-0.5 bg-blue-500/50 shadow-[0_0_10px_blue] animate-scan-move pointer-events-none" />
                )}
            </div>

            {/* Info & Controls */}
            <div className="space-y-4 px-1">
                <div className="flex items-center justify-between bg-slate-50 shadow p-3">
                    <div className="space-y-0.5">
                        <span className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                            <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest">Trạng thái</p>
                        </span>
                        <p className={`text-xs sm:text-sm font-bold truncate max-w-37.5 transition-colors ${detectState === 'success' ? 'text-green-600' : 'text-slate-700'}`}>
                            {status}
                        </p>
                    </div>

                    {mode === 'enroll' && isScanning && (
                        <div className="text-right border-l border-slate-200 pl-3">
                            <p className="text-[9px] font-bold text-gray-400 uppercase">Frames</p>
                            <p className="text-lg font-black text-blue-600 leading-none">
                                {frameCount}<span className="text-xs text-gray-300 ml-0.5">/10</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Cooldown Progress Bar */}
                {mode === 'attendance' && isScanning && (
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ease-linear ${cooldownTime > 0 ? 'bg-orange-400' : 'bg-transparent'}`}
                            style={{ width: `${(cooldownTime / 5) * 100}%` }}
                        />
                    </div>
                )}

                <button
                    onClick={handleToggle}
                    disabled={!modelsLoaded}
                    className={`w-full py-3 sm:py-4 rounded-2xl font-black text-[10px] sm:text-xs tracking-widest transition-all duration-300 active:scale-95 uppercase
                ${isScanning
                            ? 'bg-red-50 text-red-500 border border-red-100 shadow-none'
                            : 'bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-200'
                        } disabled:opacity-50`}
                >
                    {isScanning ? 'Dừng quét mặt' : (mode === 'enroll' ? 'Bắt đầu đăng ký' : 'Mở máy điểm danh')}
                </button>
            </div>

            <style jsx>{`
        @keyframes scan-move {
            0% { top: 25%; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 75%; opacity: 0; }
        }
        .animate-scan-move {
            animation: scan-move 2s ease-in-out infinite;
        }
    `}</style>
        </div>
    );
};

export default FaceRecognition;