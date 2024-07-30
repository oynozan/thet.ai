"use server";

import connectDB from "@/db/connect";
import userDB from "@/db/models/User";
import { TNetwork } from "@/lib/states";
import listingDB from "@/db/models/Listing";
import ValidateSignature from "../auth/ValidateSignature";

export default async function GetFullListing(id: string, wallet: string, network: TNetwork): Promise<any> {
    await connectDB();

    const validation = await ValidateSignature(wallet, network);
    if (!validation) return { error: "Invalid user" };

    const prompt: any = await listingDB.findOne({ _id: id }).lean();
    const isUserBought: any = await userDB
        .find({
            "history.bought": {
                $elemMatch: { id },
            },
        })
        .lean();

    if (!prompt || !isUserBought?.length) return null;
    return prompt;
}
