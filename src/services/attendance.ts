import axios from "axios";
import { AttendancePayload } from "@/types/type"

const ATTENDANCE_API = `${process.env.NEXT_PUBLIC_API_BASE}/api/attendance`

export const attendanceStudentApi = async (data: AttendancePayload) => {
  try {
    const response = await axios.post(
      `${ATTENDANCE_API}/check-in`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const attendanceLogApi = async (page: number = 1, page_size: number = 5) => {
  try {
    const response = await axios.get(`${ATTENDANCE_API}/logs?page=${page}&page_size=${page_size}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}