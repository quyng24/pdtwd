"use client"
import Navbar from "../components/Navbar";
import { logout } from "../lib/apiAuth";

export default function Admin() {
    const handleLogout = async () => logout();
    return (
        <div className="w-full">
            <Navbar></Navbar>
            <div className="bg-gray-300 min-h-screen w-full"></div>
        </div>
    );
}