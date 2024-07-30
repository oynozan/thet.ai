"use server";

import connectDB from "@/db/connect";
import listingDB from "@/db/models/Listing";
import type { TNetwork } from "@/lib/states";

export default async function GetListingsOf(wallet: string, network: TNetwork) {
    await connectDB();

    const listings = await listingDB.find({ wallet, network }).lean();

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
