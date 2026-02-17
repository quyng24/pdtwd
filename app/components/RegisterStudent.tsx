import { DatePicker, Input, Card, Divider, Button } from "antd";
import { FaUser, FaCalendar,FaCheckCircle,FaInfoCircle } from "react-icons/fa";
import CameraCapture from "./CameraCapture";
import { useRef, useCallback, useReducer } from "react";
import { message } from "antd";
import { initialState, registrationReducer } from "../store/reducer";
import { createStudentApi } from "../services/student";
import { StudentsType } from "../types/type";

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

  const handleFaceCaptured = useCallback(async (vector: number[]) => {
    if (submittingRef.current || !hasRequiredInfo) return false;

    submittingRef.current = true;
    try {
      const payload = {
        name: name.trim(),
        birthday: birthday?.format("YYYY-MM-DD"),
        face_vector: vector,
      };
      const response = await createStudentApi(payload as StudentsType)
      if (response.status === 201) {
        messageApi.success(`${response.message}`);
        dispatch({ type: 'SCAN_SUCCESS' });
      }
    } catch (error) {
      messageApi.error("Có lỗi xảy ra khi lưu dữ liệu");
      return false;
    } finally {
      submittingRef.current = false;
    }
  }, [birthday, name, hasRequiredInfo, messageApi]);

  const renderStatusArea = () => {
    if (isCameraOpen && hasRequiredInfo) {
      return (
        <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-blue-200 p-1 bg-blue-50/30">
          <CameraCapture onFaceCaptured={handleFaceCaptured} mode="register" />
          <div className="absolute top-3 right-3 animate-pulse">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          </div>
        </div>
      );
    }

    if (scanCompleted) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-2xl border border-green-100 text-center animate-in fade-in zoom-in duration-300">
          <FaCheckCircle size={32} className="text-green-500 mb-3" />
          <h4 className="text-green-800 font-bold italic">Thành công!</h4>
          <p className="text-xs text-green-600 mt-1">Đã quét khuôn mặt. Nhấn nút bên trên để quét lại.</p>
        </div>
      );
    }

    return (
      <div className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed text-center transition-colors ${hasRequiredInfo ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-200'}`}>
        <FaInfoCircle size={24} className={`mb-4 ${hasRequiredInfo ? 'text-blue-500' : 'text-gray-400'}`} />
        <p className="text-xs font-medium text-gray-500 px-4">
          {hasRequiredInfo 
            ? "Thông tin đã sẵn sàng. Nhấn nút bên trên để bật camera." 
            : "Vui lòng nhập đầy đủ thông tin để kích hoạt hệ thống."}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {contextHolder}
      <Card className=" overflow-hidden bg-white/80 backdrop-blur-lg">
        {/* Header Section */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-6 text-center rounded-xl">
          <h2 className="text-white text-xl font-bold uppercase tracking-wider">Ghi danh học viên</h2>
          <p className="text-blue-100 text-xs mt-1">Đăng ký thông tin và nhận diện khuôn mặt</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Input Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <FaUser size={14} className="text-blue-500" /> Họ tên học sinh
            </label>
            <Input
              placeholder="Ví dụ: Nguyễn Văn A"
              value={name}
              onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
              className="h-12 rounded-xl border-gray-100 hover:border-blue-400 focus:border-blue-500 transition-all bg-gray-50/50"
            />
          </div>

          {/* Input Birthday */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <FaCalendar size={14} className="text-blue-500" /> Ngày sinh
            </label>
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Chọn ngày sinh"
              onChange={(date) => dispatch({ type: "SET_BIRTHDAY", payload: date })}
              value={birthday}
              className="w-full h-12 rounded-xl border-gray-100 hover:border-blue-400 bg-gray-50/50"
            />
          </div>

          <Divider className="my-2 border-gray-100" />

          {/* Camera / Status Section */}
          <div className="relative">
            {hasRequiredInfo && (
              <div className="mb-4 flex justify-center">
                <Button
                  type="primary"
                  size="large"
                  className="rounded-xl bg-blue-600 bg-linear-to-r"
                  onClick={handleOpenCamera}
                >
                  {scanCompleted ? "Quét lại khuôn mặt" : "Bật camera để quét"}
                </Button>
              </div>
            )}

            {isReadyToScan ? (
              <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-blue-200 p-1 bg-blue-50/30">
                <CameraCapture
                  onFaceCaptured={handleFaceCaptured}
                  mode="register"
                />
                <div className="absolute top-3 right-3 animate-pulse">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                </div>
              </div>
            ) : scanCompleted ? (
              <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-2xl border border-green-100 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-green-200">
                  <FaCheckCircle size={32} className="text-white" />
                </div>
                <h4 className="text-green-800 font-bold italic">Thành công!</h4>
                <p className="text-xs text-green-600 mt-1 px-4 leading-relaxed">
                  Đã quét khuôn mặt. Nhấn "Quét lại khuôn mặt" nếu cần quét lại.
                </p>
              </div>
            ) : hasRequiredInfo ? (
              <div className="flex flex-col items-center justify-center p-8 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                <p className="text-xs font-medium text-blue-700 leading-relaxed px-4">
                  Thông tin đã sẵn sàng. Nhấn nút bên trên để bật camera và quét khuôn mặt.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center group transition-colors hover:bg-blue-50/30 hover:border-blue-200">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <FaInfoCircle size={24} className="text-gray-400 group-hover:text-blue-500" />
                </div>
                <p className="text-xs font-medium text-gray-500 leading-relaxed px-4 group-hover:text-gray-600">
                  Vui lòng <span className="text-blue-600 font-bold">nhập đầy đủ thông tin</span> bên trên để kích hoạt hệ thống quét khuôn mặt.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em]">
        Hệ thống nhận diện Panda Taekwondo v2.0
      </p>
    </div>
  );
}
