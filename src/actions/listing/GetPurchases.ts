"use server";

import connectDB from "@/db/connect";
import userDB from "@/db/models/User";
import listingDB from "@/db/models/Listing";
import type { TNetwork } from "@/lib/states";
import ValidateSignature from "../auth/ValidateSignature";

export default async function GetPurchases(wallet: string, network: TNetwork) {
    await connectDB();

    // Verify ownership of account
    const validation = await ValidateSignature(wallet, network);
    if (!validation) return [];

    // Get bought prompts from user DB
    const user: any = await userDB.findOne({ wallet, network }).lean();
    if (!user?.history?.bought?.length) return [];

    const prompts = user.history.bought;
    const ids = prompts.map((p: any) => p.id);

    const listings = await listingDB.find({ _id: { $in: ids } }).lean();

    const returnValue = listings.map(listing => ({
        _id: listing!._id!.toString(),
        wallet: listing.wallet,
        promptLength: listing.prompt.length,
        seed: listing?.customization?.[3] || 0,
        type: listing.type,
        title: listing.title,
        description: listing.description,
        price: listing.price,
        currency: listing.currency,
        preview: listing.preview,
        sales: listing.sales,
        date: listing.date,
    }));

    return returnValue;
}
