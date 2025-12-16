"use client";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { FormDataType } from "../types/type";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Modal, Button, Upload, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createActivities } from "../services/activities";

export default function Admin() {
  const [messageApi, contextHolder] = message.useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    image_base64: null,
  });

  // function convert file → Base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });

  const handleUploadChange = async (info: UploadChangeParam<UploadFile>) => {
    const { file, fileList } = info;
    if (fileList.length === 0) {
      setFormData((prev) => ({ ...prev, image: null }));
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

  // handle save database
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
      const res = await createActivities(formData);
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
          content: "Thêm hoạt động thất bại!",
        });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      Modal.error({ title: "Lỗi!", content: errorMessage });
    }
    setLoading(false);
    setPreviewOpen(false);
  };
  return (
    <div className="w-full min-h-screen">
      {contextHolder}
      <Navbar />
      <div className="w-full h-full px-10 sm:px-16 md:px-20 py-5 lg:py-10 mt-[88px]">
        <div className="mx-auto p-5 bg-white flex flex-col gap-5">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Thêm bài viết về hoạt động mới của lớp
          </h2>
          {/* Title */}
          <div className="border-b border-b-gray-200 py-3 flex flex-col items-start gap-3">
            <label htmlFor="input-title" className="font-medium">
              Tiêu đề
            </label>
            <Input
              id="input-title"
              placeholder="Nhập tiêu đề của bài viết"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* Description */}
          <div className="border-b border-b-gray-200 py-3 flex flex-col items-start gap-3">
            <label htmlFor="input-description" className="font-medium">
              Mô tả chi tiết
            </label>
            <Input.TextArea
              id="input-description"
              placeholder="Nhập nội dung của bài viết"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          {/* Upload Image */}
          <div className="py-3 flex flex-col items-start gap-3">
            <label htmlFor="input-uploadimg" className="font-medium">
              Tải lên ảnh
            </label>
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

          {/* Nút Preview */}
          <Button
            type="primary"
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

          {/* MODAL PREVIEW */}
          <Modal
            title="Xem trước nội dung"
            open={previewOpen}
            onCancel={() => setPreviewOpen(false)}
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/70 pointer-events-none"></div>
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
