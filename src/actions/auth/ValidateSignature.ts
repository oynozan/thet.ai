"use server";

import { cookies } from "next/headers";
import { verifyMessage } from "ethers";
import GetUser from "./GetUser";
import AddUser from "./AddUser";

export default async function ValidateSignature(wallet: string, raw_signature?: string): Promise<boolean> {
    const signature = cookies().get("signature")?.value;

    if (!signature && !raw_signature) return false;

    const finalSignature = (raw_signature ?? signature) as string;
    const signerAddress = verifyMessage("Welcome to thet.ai - The P2P Prompt Marketplace", finalSignature);

    if (signerAddress.toLowerCase() !== wallet.toLowerCase()) return false;

    if (!signature) {
        const user = await GetUser(wallet);

        // Register user
        if (!user) await AddUser(wallet);

        const expires = Date.now() + 24 * 60 * 60 * 1000 * 90; // 90 Days

        cookies().set("signature", finalSignature, {
            expires,
            httpOnly: true,
        });
    }

    return true;
}
