"use server";

import { cookies } from "next/headers";

export default async function Logout() {
    cookies().delete("signature");
    return true;
}
