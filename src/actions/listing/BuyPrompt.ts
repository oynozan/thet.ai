"use server";

import { ethers } from "ethers";

import connectDB from "@/db/connect";
import userDB from "../../db/models/User";
import type { TNetwork } from "@/lib/states";
import listingDB from "../../db/models/Listing";
import ValidateSignature from "../auth/ValidateSignature";

export default async function BuyPrompt(
    wallet: string,
    network: TNetwork,
    to: string,
    promptID: string,
    amount: number,
    txHash: string,
    currency: "TPR" | "TFUEL",
) {
    await connectDB();

    const validation = await ValidateSignature(wallet, network);
    if (!validation) return { error: "Invalid user" };

    const rpcURL =
        network === "Theta Mainnet"
            ? "https://eth-rpc-api.thetatoken.org/rpc"
            : "https://eth-rpc-api-testnet.thetatoken.org/rpc";

    const provider = new ethers.JsonRpcProvider(rpcURL);
    const tx = await provider.getTransaction(txHash);

    const expectedMessage = promptID;

    if (!tx) {
        return { error: "Transaction not found" };
    }

    const receipt = await tx.wait();

    if (tx?.to?.toLowerCase() !== to.toLowerCase()) {
        return { error: "Recipient address mismatch" };
    }
    if (tx.value.toString() !== ethers.parseEther(amount.toString()).toString()) {
        return { error: "Transaction value mismatch" };
    }
    if (!expectedMessage || tx.data !== ethers.hexlify(ethers.toUtf8Bytes(expectedMessage))) {
        return { error: "Transaction message mismatch" };
    }
    if (!receipt || receipt.status === 0) {
        return { error: "Transaction failed" };
    }

    console.log(`${wallet} bought ${expectedMessage}`);

    // Update listing stat
    await listingDB.updateOne(
        { _id: promptID },
        {
            $inc: {
                sales: 1,
            },
        },
    );

    const now = Date.now();

    // Update user histories
    await userDB.updateOne(
        { wallet, network },
        {
            $push: {
                "history.bought": {
                    id: promptID,
                    amount,
                    currency,
                    date: now,
                },
            },
        },
    );

    await userDB.updateOne(
        { wallet: to, network },
        {
            $push: {
                "history.sold": {
                    id: promptID,
                    amount,
                    currency,
                    date: now,
                },
            },
        },
    );

    return { success: true };
}
