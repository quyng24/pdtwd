import { signInWithPopup, signOut } from "firebase/auth";
import {auth, provider} from "./firebase";

export const  login = async () => {
    try {
        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        const allowedEmails = [
            "nquy50771@gmail.com",
            "phamthanhnhan2460@gmail.com",
        ];
        
        if (user.email && allowedEmails.includes(user.email)) {
            window.location.href = "/admin"
            return user;
        } else {
            await signOut(auth);
            alert("Email của bạn không có quyền truy cập hệ thống!");
            return null;
        }
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert("Đăng nhập thất bại!");
        return null;
    }
}
export const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = "/"
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert("Đăng nhập thất bại!");
        return null;
    }
};