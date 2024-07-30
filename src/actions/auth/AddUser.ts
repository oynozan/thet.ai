"use server";

import userDB from "../../db/models/User";
import type { TNetwork } from "@/lib/states";

export default async function AddUser(wallet: string, network: TNetwork) {
    try {
        const obj = { wallet, network };
        const newUser = new userDB(obj);
        await newUser.save();

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
