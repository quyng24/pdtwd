import { dataCardActivities } from "../types/type";
import { API_BASE } from "./api";
import axios from "axios";

const API_ACTIVITIES = `${API_BASE}/activities/`;
export const getActivities = async () => {
  try {
    const response = await axios.get(API_ACTIVITIES);
    return response.data;
  } catch (error) {
    return dataCardActivities;
  }
};
