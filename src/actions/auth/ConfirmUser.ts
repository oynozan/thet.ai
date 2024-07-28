"use server";

import { ethers } from "ethers";

import connectDB from "@/db/connect";
import userDB from "../../db/models/User";

export default async function ConfirmUser(wallet: string) {
    await connectDB();

    const provider = new ethers.JsonRpcProvider("https://eth-rpc-api.thetatoken.org/rpc");
    const balance = parseFloat(ethers.formatEther(await provider.getBalance(wallet)));

    // More than 10 TFUEL
    if (balance >= 10) {
        try {
            await userDB.findOneAndUpdate({ wallet }, { confirmed: true });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    return false;
}
