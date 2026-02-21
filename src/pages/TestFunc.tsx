"use client"

import React, { useState } from 'react';
import FaceRecognition from '@/components/FaceRecognition';

export default function TestFunc() {
    const [studentName, setStudentName] = useState('');
    const [embeddingsCollected, setEmbeddingsCollected] = useState<Float32Array[] | null>(null);

    const handleEmbeddingsReady = (embeddings: Float32Array[]) => {
        console.log('Đã thu thập đủ 10 embeddings:', embeddings);
        setEmbeddingsCollected(embeddings);
        // Gửi lên backend ngay (ví dụ: POST /api/enroll)
    };

    const handleError = (msg: string) => {
        alert(msg); // Hoặc dùng toast notification
    };

    const handleComplete = () => {
        console.log('Quá trình enroll hoàn tất, camera đã tắt.');
        // Có thể reset form hoặc chuyển trang
    };

    return (
        <div>
            <h2>Thêm học sinh mới</h2>
            <input
                type="text"
                placeholder="Tên học sinh"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
            />
            <FaceRecognition
                mode="attendance"
                onEmbeddingsReady={handleEmbeddingsReady}
                onError={handleError}
                onComplete={handleComplete}
            />
            {embeddingsCollected && <p>Đã thu thập {embeddingsCollected.length} frames → Đang xử lý...</p>}
        </div>
    );
};