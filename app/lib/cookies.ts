"use server"
import {cookies} from "next/headers";
import { UserCookie } from "../types/type";

export async function setUserCookie(user: UserCookie) {
    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify(user), {path: '/', maxAge: 60 * 60 * 24 * 7});
}

export async function getUserCookie() {
    const cookieStore = await cookies();
    const user = cookieStore.get("user")?.value;
    return user ? JSON.parse(user) : null;
}

export async function clearUserCookie() {
    const cookieStore = await cookies();
    cookieStore.delete("user");
}