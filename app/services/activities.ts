import { dataCardActivities, FormDataType } from "../types/type";
import { API_BASE } from "./api";
import axios from "axios";

const API_ACTIVITIES = `${API_BASE}/activities/`;
export const getActivities = async () => {
  try {
    const response = await axios.get(API_ACTIVITIES);
    return response.data;
  } catch {
    return dataCardActivities;
  }
};

export const createActivities = async (data: FormDataType) => {
  try {
    const response = await axios.post(API_ACTIVITIES, data);
    return response.data;
  } catch (error) {
    alert(error);
  }
};
