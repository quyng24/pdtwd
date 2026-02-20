import { DatePicker, Input, Divider, Button, message } from "antd";
import { FaUser, FaCalendar } from "react-icons/fa";
import CameraCapture from "./CameraCapture";
import { useRef, useCallback, useReducer } from "react";
import { initialState, registrationReducer } from "../store/reducer";
import { createStudentApi } from "../services/student";

export default function RegisterStudent() {
  const [messageApi, contextHolder] = message.useMessage();
  const submittingRef = useRef(false);
  const [state, dispatch] = useReducer(registrationReducer, initialState);
  const { name, birthday, scanCompleted, isCameraOpen } = state;

  const hasRequiredInfo = Boolean(name.trim() && birthday);
  const isReadyToScan = hasRequiredInfo && isCameraOpen;

  const handleOpenCamera = useCallback(() => {
    if (!name.trim() || !birthday) {
      messageApi.warning("Vui lòng nhập tên và ngày sinh trước khi quét khuôn mặt");
      return;
    }
    dispatch({ type: "OPEN_CAMERA" });
  }, [birthday, messageApi, name]);

  const handleFaceCaptured = async (data: number[] | number[][]) => {
    if (Array.isArray(data) && Array.isArray(data[0]) && !submittingRef.current) {
      submittingRef.current = true;
      const hideLoading = messageApi.loading("Đang lưu thông tin võ sinh...", 0);

      try {
        const birthdayStr: string = birthday ? birthday.format("YYYY-MM-DD") : "";
        const payload = { name: name, birthday: birthdayStr, face_vector: data };
        const response = await createStudentApi(payload);
        if (response.status === 201) {
          messageApi.success(response.message);
          dispatch({ type: "SCAN_SUCCESS" });
          return true;
        } else if (response.status === 401) {
          messageApi.error(response.message);
          return false;
        }
      } catch (error: any) {
        console.error("Lỗi đăng ký:", error);
        messageApi.error(error.response?.data?.detail || "Ôi thôi chết! Tôi bị lỗi rồi");
        return false;
      } finally {
        hideLoading();
        submittingRef.current = false;
      }
    }
    return false;
  };

  return (
    <div className="w-full max-w-md mx-auto px-0 lg:px-4">
      {contextHolder}
      <div className="overflow-hidden bg-white/90 backdrop-blur-lg p-4 lg:p-8 shadow-lg rounded sm:rounded-3xl border-none">
        {/* Header Section */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-2 sm:p-4 text-center rounded md:rounded-xl sm:rounded-2xl">
          <h2 className="text-white text-sm sm:text-xl font-bold uppercase tracking-wider">Ghi danh học viên</h2>
          <p className="text-blue-100 text-[10px] sm:text-xs mt-1 italic opacity-80">Panda Taekwondo Management System</p>
        </div>

        <div className="pt-4 md:p-5 space-y-6">
          {/* Input Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <FaUser size={12} className="text-blue-500" /> Họ tên võ sinh
            </label>
            <Input
              placeholder="Nhập họ và tên..."
              value={name}
              onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
              className="h-8 md:h-12 rounded-xl border-slate-100 bg-slate-50/50 hover:border-blue-300 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.1)] transition-all"
            />
          </div>

          {/* Input Birthday */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <FaCalendar size={12} className="text-blue-500" /> Ngày tháng năm sinh
            </label>
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Chọn ngày sinh"
              onChange={(date) => dispatch({ type: "SET_BIRTHDAY", payload: date })}
              value={birthday}
              className="w-full h-8 md:h-12 rounded-xl border-slate-100 bg-slate-50/50 hover:border-blue-300 transition-all"
            />
          </div>

          <Divider className="my-2 border-slate-50" />

          {/* Camera / Status Section */}
          <div className="relative">
            {hasRequiredInfo && !isCameraOpen && (
              <div className="mb-4 flex justify-center">
                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-xl h-11 font-bold shadow-lg"
                  onClick={handleOpenCamera}
                >
                  {scanCompleted ? "Quét lại khuôn mặt" : "Bắt đầu quét"}
                </Button>
              </div>
            )}

            {isReadyToScan && (
              <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-full overflow-hidden">
                <CameraCapture
                  onFaceCaptured={handleFaceCaptured}
                  mode="register"
                  onScanComplete={() => {
                    dispatch({ type: "SCAN_SUCCESS" });
                  }}
                />

                {/* Nút đóng camera khẩn cấp trên mobile */}
                <button
                  onClick={() => dispatch({ type: "SCAN_SUCCESS" })}
                  className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full shadow-lg z-50 text-xs flex items-center justify-center font-bold border-2 border-white"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 opacity-30 grayscale">
        {/* Có thể thêm logo CLB ở đây */}
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Panda Taekwondo AI Security</p>
      </div>
    </div>
  );
}