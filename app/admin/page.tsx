"use client"
import { logout } from "../lib/apiAuth";

export default function Admin() {
    const handleLogout = async () => logout();
    return (
        <div className="w-full">
            <nav className="fixed top-0 w-full bg-white flex justify-between shadow z-50">
                <h2>Admin</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    );
}