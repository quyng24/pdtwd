import { dataCardActivities } from "../types/type";
import { API_BASE } from "./api";

const API_ACTIVITIES = `${API_BASE}/activities`;
export const getActivities = async () => {
  try {
    const response = await fetch(API_ACTIVITIES);
    return response.json();
  } catch (error) {
    return dataCardActivities;
  }
};
