"use server";

import { ethers } from "ethers";

import connectDB from "@/db/connect";
import userDB from "../../db/models/User";
import type { TNetwork } from "@/lib/states";
import listingDB from "../../db/models/Listing";
import type { TPromptType } from "@/data/PromptTypes";
import ValidateSignature from "../auth/ValidateSignature";

export default async function CreateListing(
    wallet: string,
    network: TNetwork,
    prompt: string,
    type: TPromptType,
    title: string,
    description: string,
    amount: number,
    txHash: string,
    customization: Array<any>,
    currency: "TPR" | "TFUEL",
    preview: string,
) {
    // TODO: Implement zod validation (https://zod.dev/)
    await connectDB();

    const validation = await ValidateSignature(wallet, network);
    if (!validation) return { error: "Invalid user" };

    const rpcURL =
        network === "Theta Mainnet"
            ? "https://eth-rpc-api.thetatoken.org/rpc"
            : "https://eth-rpc-api-testnet.thetatoken.org/rpc";

    const provider = new ethers.JsonRpcProvider(rpcURL);

    if (!prompt || prompt.length > 5000) return { error: "Invalid prompt" };
    if (description && description.length > 1000) return { error: "Invalid description" };
    if (!title || title.length < 10 || title.length > 60) return { error: "Invalid title" };

    const tx = await provider.getTransaction(txHash);

    const feeRate = 0.5 / 100;
    const expectedTo = "0xD1Ae6836A88E7E457527dbbC805b2bEdBd02A843";
    const expectedMessage = `${wallet} creates prompt listing and pays ${amount * feeRate} ${currency} amount of fee`;

    if (!tx) {
        return { error: "Transaction not found" };
    }

    const receipt = await tx.wait();

    if (tx?.to?.toLowerCase() !== expectedTo.toLowerCase()) {
        return { error: "Recipient address mismatch" };
    }
    if (tx.value.toString() !== ethers.parseEther((amount * feeRate).toString()).toString()) {
        return { error: "Transaction value mismatch" };
    }
    if (!expectedMessage || tx.data !== ethers.hexlify(ethers.toUtf8Bytes(expectedMessage))) {
        return { error: "Transaction message mismatch" };
    }
    if (!receipt || receipt.status === 0) {
        return { error: "Transaction failed" };
    }

    console.log(expectedMessage);

    // Add listing to DB
    const newListing = new listingDB({
        tx: txHash,
        wallet,
        network,
        prompt,
        type,
        title,
        description,
        price: amount,
        currency,
        customization,
        preview,
        date: Date.now(),
    });

    await newListing.save();

    const ID = newListing._id.toString();

    return { id: ID };
}
