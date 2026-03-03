import axios from "axios";
import { AttendanceLogResponse, AttendancePayload } from "@/types/type"

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

export const attendanceLogApi = async (month: number = new Date().getMonth() + 1, year: number = new Date().getFullYear()) => {
  try {
    const response = await axios.get<AttendanceLogResponse>(`${ATTENDANCE_API}/month?month=${month}&year=${year}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
