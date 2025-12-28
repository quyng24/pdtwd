import { NotificationPlacement } from "antd/es/notification/interface";
import { Dayjs } from "dayjs";

export interface UserCookie {
  name?: string;
  email?: string;
}

export interface CardBaseProps {
  img?: string;
  title: string;
  description?: string;
  link?: string;
}
export interface AuthContextType {
  user: UserCookie | null;
  loading: boolean;
  loginProvider: () => void;
  logoutProvider: () => void;
  isAdmin: () => void;
}

export interface FormDataType {
  title: string;
  description: string;
  image_base64: string | null;
}

export interface Activity {
  img_url: string | null;
  title: string;
  description: string;
}

export interface CardActivity {
  id?: number;
  title: string;
  description: string;
  img_url: string;
}

export interface NotifyOptions {
  message: string;
  description?: string;
  placement?: NotificationPlacement;
  duration?: number;
}

export interface DataTypeTable {
  key: string;
  name: string;
  age: number;
  address: string;
}

export interface BaseChartProps {
  data: { name: string; value: number }[];
  title?: string;
}

export interface StudentsType {
  name: string;
  birthday: string;
  image_base64: string;
}

export type NotifyType = "success" | "error" | "info" | "warning";

export interface CameraCaptureProps {
  onFaceCaptured: (base64: string) => void;
  buttonTextOff?: string;
  buttonTextOn?: string;
  showPreview?: boolean;
  autoCloseAfterCapture?: boolean;
}

export const dataCardActivities = [
  {
    image:
      "https://c8.alamy.com/comp/2D9BRRD/taekwondo-vector-icon-design-illustration-template-2D9BRRD.jpg",
    title: "Lớp tham gia kì thi lên đai",
    description:
      "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
    createdAt: "",
  },
  {
    image:
      "https://c8.alamy.com/comp/2D9BRRD/taekwondo-vector-icon-design-illustration-template-2D9BRRD.jpg",
    title: "Lớp tham gia kì thi lên đai",
    description:
      "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
    createdAt: "",
  },
  {
    image:
      "https://c8.alamy.com/comp/2D9BRRD/taekwondo-vector-icon-design-illustration-template-2D9BRRD.jpg",
    title: "Lớp tham gia kì thi lên đai",
    description:
      "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
    createdAt: "",
  },
];

export const initialData = [
  {
    key: "1",
    name: "John Brown",
    age: 16,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 32,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 17,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Quicy Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "5",
    name: "Joe Quicy",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Quicy",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];
