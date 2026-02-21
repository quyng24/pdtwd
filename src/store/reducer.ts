import { RegisterStudentState } from "../../src/types/type";
import { Dayjs } from "dayjs";

type Action = 
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_BIRTHDAY'; payload: Dayjs | null }
  | { type: 'RESET_FORM' };

export const initialState: RegisterStudentState = {
  name: "",
  birthday: null,
  scanCompleted: false,
  isCameraOpen: false,
};

export function registrationReducer(state: RegisterStudentState, action: Action): RegisterStudentState {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload, scanCompleted: false, isCameraOpen: false };
    case 'SET_BIRTHDAY':
      return { ...state, birthday: action.payload, scanCompleted: false, isCameraOpen: false };
    default:
      return state;
  }
}