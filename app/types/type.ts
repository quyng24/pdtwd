import { NotificationPlacement } from "antd/es/notification/interface";

export interface UserCookie {
  name?: string,
  email?: string
}

export interface CardBaseProps {
  img?: string,
  title: string,
  description?: string,
  link?: string
}
export interface AuthContextType {
  user: UserCookie | null;
  loading: boolean;
  loginProvider: () => void;
  logoutProvider: () => void;
  isAdmin: () => void;
};

export interface FormDataType {
  title: string;
  description: string;
  link?: string;
  image: string | null; // base64
}

export interface Activity {
  image: string;
  title: string;
  description: string;
  createdAt: string;
};

export interface NotifyOptions {
  message: string;
  description?: string;
  placement?: NotificationPlacement;
  duration?: number;
}

export type NotifyType = "success" | "error" | "info" | "warning";

export const dataCardActivities = [
    {
      image: "https://c8.alamy.com/comp/2D9BRRD/taekwondo-vector-icon-design-illustration-template-2D9BRRD.jpg",
      title: "Lớp tham gia kì thi lên đai",
      description: "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
      createdAt: ""
    },
    {
      image: "https://c8.alamy.com/comp/2D9BRRD/taekwondo-vector-icon-design-illustration-template-2D9BRRD.jpg",
      title: "Lớp tham gia kì thi lên đai",
      description: "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
      createdAt: ""
    },
    {
      image: "https://c8.alamy.com/comp/2D9BRRD/taekwondo-vector-icon-design-illustration-template-2D9BRRD.jpg",
      title: "Lớp tham gia kì thi lên đai",
      description: "Hình ảnh các bạn học viên tham gia cuộc thi quý thường liên tại chung cư Tòa Báo Nhân Dân Xuân Phương",
      createdAt: ""
    },
  ];