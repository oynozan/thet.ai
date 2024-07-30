"use server";

import { ethers } from "ethers";

import connectDB from "@/db/connect";
import userDB from "../../db/models/User";
import type { TNetwork } from "@/lib/states";

export default async function ConfirmUser(wallet: string, network: TNetwork) {
    await connectDB();

    const rpcURL =
        network === "Theta Mainnet"
            ? "https://eth-rpc-api.thetatoken.org/rpc"
            : "https://eth-rpc-api-testnet.thetatoken.org/rpc";

    const provider = new ethers.JsonRpcProvider(rpcURL);
    const balance = parseFloat(ethers.formatEther(await provider.getBalance(wallet)));

    // More than 10 TFUEL
    if (balance >= 10) {
        try {
            await userDB.findOneAndUpdate({ wallet, network }, { confirmed: true });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    return false;
}
