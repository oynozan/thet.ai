"use server";

import userDB from "../../db/models/User";

export default async function AddUser(wallet: string) {
    try {
        const obj = { wallet };
        const newUser = new userDB(obj);
        await newUser.save();

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
