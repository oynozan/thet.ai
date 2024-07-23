"use client";

import Logout from "@/actions/auth/Logout";

export default function Profile() {
    function logout() {
        Logout();
        window.location.href = "/";
    }

    return <button onClick={logout}>Logout</button>;
}
