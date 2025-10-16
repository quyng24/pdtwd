import { onAuthStateChanged, User } from "firebase/auth";
import {auth} from '../lib/firebase';
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function PrivateRouter({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {setUser(u); setLoading(false)});
        return () => unsub();
    }, []);

    if (loading) {
        return <p>Đang kiểm tra đăng nhập...</p>;
    }

    const allowedEmails = [
        "nquy50771@gmail.com",
        "phamthanhnhan2460@gmail.com",
    ];

    if (!user || !allowedEmails.includes(user.email ?? "")) {
        router.push('/');
    }
    return children;
}