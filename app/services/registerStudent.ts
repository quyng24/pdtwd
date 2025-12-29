import axios from "axios";
import { StudentsType } from "../types/type";
import { API_BASE } from "./api";

const STUDENT_API = `http://localhost:8000/students/`;

export const createStudent = async (formDataStudent: StudentsType) => {
  const response = await axios.post(STUDENT_API, formDataStudent);
  return response;
};
