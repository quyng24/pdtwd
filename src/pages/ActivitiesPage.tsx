"use client";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useRouter } from "next/navigation";
import { FormDataType } from "@/types/type";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Upload, Input, message } from "antd";

import Navbar from "@/components/shared/Navbar";
import { createDataActivities } from "@/services/activities";
import { allowedEmails } from "@/lib/auth";
import { getUserCookie } from "@/lib/cookies";

export default function ActivitiesPage() {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({
        title: "",
        description: "",
        image_base64: null,
    });

    useEffect(() => {
        let isMounted = true;

        const verifyUser = async () => {
            try {
                const user = await getUserCookie();
                if (!isMounted) return;
                if (!user || !allowedEmails.includes(user.email)) {
                    router.replace("/");
                }
            } catch (error) {
                console.error("Error checking user:", error);
                if (isMounted) router.replace("/");
            }
        };

        verifyUser();

        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) verifyUser();
        };
        window.addEventListener("pageshow", handlePageShow);

        return () => {
            isMounted = false;
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, [router]);

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (err) => reject(err);
        });

    const handleUploadChange = async (info: UploadChangeParam<UploadFile>) => {
        const { fileList } = info;
        if (fileList.length === 0) {
            setFormData((prev) => ({ ...prev, image_base64: null }));
            return;
        }
        const latestFile = fileList[fileList.length - 1];
        if (latestFile.originFileObj) {
            try {
                const base64 = await toBase64(latestFile.originFileObj);
                setFormData((prev) => ({ ...prev, image_base64: base64 }));
                messageApi.open({ type: "success", content: "Đã thêm ảnh thành công" });
            } catch (err) {
                messageApi.open({ type: "error", content: "Lỗi tải hình ảnh" });
                console.error(err);
            }
        }
    };

    const handleConfirm = async () => {
        if (
            !formData.title.trim() ||
            !formData.description.trim() ||
            !formData.image_base64
        ) {
            message.error("Bạn phải nhập Title, Description và Ảnh!");
            return;
        }
        setLoading(true);
        try {
            const res = await createDataActivities(formData);
            if (res.status === "success") {
                messageApi.open({
                    type: "success",
                    content: "Đã thêm hoạt động mới thành công!",
                });
                setFormData({
                    title: "",
                    description: "",
                    image_base64: null,
                });
            } else {
                messageApi.open({
                    type: "error",
                    content: res.message || "Thêm hoạt động thất bại!",
                });
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            Modal.error({ title: "Lỗi!", content: errorMessage });
        }
        setLoading(false);
        setPreviewOpen(false);
    };

    const isFormReady = Boolean(
        formData.title.trim() && formData.description.trim() && formData.image_base64
    );

    return (
        <div className="min-h-screen w-full">
            {contextHolder}
            <Navbar />
            <div className="mx-auto mt-22 w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
                <div className="rounded md:rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                        Admin Activities
                    </p>
                    <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                        Quản lý bài viết hoạt động
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
                        Tạo nội dung mới cho fanpage/lịch sử hoạt động CLB với định dạng ảnh
                        + mô tả thống nhất.
                    </p>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
                    <div className="rounded md:rounded-2xl p-6 shadow-sm sm:p-8 bg-white">
                        <div className="grid gap-5">
                            <div className="space-y-2">
                                <label
                                    htmlFor="input-title"
                                    className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500"
                                >
                                    Tiêu đề bài viết
                                </label>
                                <Input
                                    id="input-title"
                                    placeholder="Nhập tiêu đề của bài viết"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, title: e.target.value }))
                                    }
                                    className="h-11 rounded-xl border-slate-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="input-description"
                                    className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500"
                                >
                                    Nội dung mô tả
                                </label>
                                <Input.TextArea
                                    id="input-description"
                                    placeholder="Nhập nội dung của bài viết"
                                    rows={6}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    className="rounded-xl border-slate-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="input-uploadimg"
                                    className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500"
                                >
                                    Ảnh hoạt động
                                </label>
                                <div className="rounded-xl border border-dashed border-slate-300 p-3">
                                    <Upload
                                        id="input-uploadimg"
                                        listType="picture-card"
                                        beforeUpload={() => false}
                                        onChange={handleUploadChange}
                                        maxCount={1}
                                        fileList={
                                            formData.image_base64
                                                ? [
                                                    {
                                                        uid: "-1",
                                                        name: "image.png",
                                                        status: "done",
                                                        url: formData.image_base64,
                                                    },
                                                ]
                                                : []
                                        }
                                    >
                                        {!formData.image_base64 && (
                                            <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Thêm ảnh</div>
                                            </div>
                                        )}
                                    </Upload>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="h-11 rounded-xl bg-blue-600 px-6 hover:bg-blue-700!"
                                    onClick={() => {
                                        if (!formData.title.trim()) {
                                            messageApi.open({
                                                type: "error",
                                                content: "Vui lòng nhập tiêu đề!",
                                            });
                                            return;
                                        }
                                        if (!formData.description.trim()) {
                                            messageApi.open({
                                                type: "error",
                                                content: "Vui lòng nhập nội dung mô tả của hoạt động!",
                                            });
                                            return;
                                        }
                                        if (!formData.image_base64) {
                                            messageApi.open({
                                                type: "error",
                                                content: "Vui lòng thêm ảnh!",
                                            });
                                            return;
                                        }
                                        setPreviewOpen(true);
                                    }}
                                >
                                    Xem Preview
                                </Button>
                            </div>
                        </div>
                    </div>

                    <aside className="rounded md:rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                        <h3 className="text-lg font-bold text-slate-900">Trạng thái bài viết</h3>
                        <div className="mt-4 space-y-3">
                            <div className="rounded md:rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                                    Tiêu đề
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {formData.title.trim() ? "Đã nhập" : "Chưa nhập"}
                                </p>
                            </div>
                            <div className="rounded md:rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                                    Nội dung
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {formData.description.trim() ? "Đã nhập" : "Chưa nhập"}
                                </p>
                            </div>
                            <div className="rounded md:rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                                    Ảnh
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {formData.image_base64 ? "Đã tải lên" : "Chưa tải lên"}
                                </p>
                            </div>
                        </div>

                        <div
                            className={`mt-5 rounded md:rounded-xl border p-4 text-sm ${isFormReady
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-amber-200 bg-amber-50 text-amber-700"
                                }`}
                        >
                            {isFormReady
                                ? "Sẵn sàng xem preview và lưu bài viết."
                                : "Điền đầy đủ tiêu đề, mô tả và ảnh để hoàn tất."}
                        </div>
                    </aside>

                    {/* MODAL PREVIEW */}
                    <Modal
                        title="Xem trước nội dung"
                        open={previewOpen}
                        onCancel={() => setPreviewOpen(false)}
                        width={760}
                        footer={[
                            <Button key="cancel" onClick={() => setPreviewOpen(false)}>
                                Hủy
                            </Button>,
                            <Button
                                key="confirm"
                                type="primary"
                                loading={loading}
                                onClick={handleConfirm}
                            >
                                Xác nhận lưu
                            </Button>,
                        ]}
                    >
                        <div className="w-full bg-white rounded overflow-hidden shadow-lg max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300">
                            <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden">
                                <div
                                    style={{ backgroundImage: `url(${formData.image_base64})` }}
                                    className="bg-cover bg-center w-full h-full transform transition-transform duration-500 hover:scale-105"
                                ></div>

                                {/* Overlay gradient đen mờ dần từ trên xuống dưới */}
                                <div className="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/70 pointer-events-none"></div>
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 relative z-10 line-clamp-1">
                                    {formData.title}
                                </h2>
                                <p className="text-sm text-gray-500 line-clamp-3">
                                    {formData.description}
                                </p>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
