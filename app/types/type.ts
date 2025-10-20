export interface UserCookie {
    name?: string,
    email?: string
}
export interface AuthContextType {
  user: UserCookie | null;
  loading: boolean;
  loginProvider: () => void;
  logoutProvider: () => void;
  isAdmin: () => void;
};