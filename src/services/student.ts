import axios from "axios";
import { StudentsType } from "../../src/types/type";
const STUDENT_API = `${process.env.NEXT_PUBLIC_API_BASE}/api/students`;

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

