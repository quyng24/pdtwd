import axios from "axios";
import { StudentsType } from "../types/type";
const STUDENT_API = `http://localhost:8000/students/`;

export const createStudent = async (formDataStudent: StudentsType) => {
  try {
    const response = await axios.post(STUDENT_API, formDataStudent, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
