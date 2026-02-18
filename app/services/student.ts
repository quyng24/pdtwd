import axios from "axios";
import { AttendancePayload, StudentsType } from "../types/type";
const STUDENT_API = `${process.env.NEXT_PUBLIC_API_BASE}/students`;

export const createStudentApi = async (data: StudentsType) => {
  try {
    const response = await axios.post(`${STUDENT_API}/create`, data, {
      headers: {
        "Content-Type": "application/json"
      }});
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const attendanceStudentApi = async (data: AttendancePayload) => {
  try {
    const response = await axios.post(
      `${STUDENT_API}/attendance`,
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
    const response = await axios.get(`${STUDENT_API}/attendance/logs?page=${page}&page_size=${page_size}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
