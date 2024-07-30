"use server";

import connectDB from "@/db/connect";
import type { TNetwork } from "@/lib/states";
import listingDB from "../../db/models/Listing";

export default async function SearchListing(query: string, network: TNetwork) {
    try {
        await connectDB();

        if (!query || query?.length < 3 || query?.length > 64)
            return { error: "Search query must be between 3 and 64 characters." };

        const listings = await listingDB.aggregate([
            {
                $match: {
                    network,
                    $or: [
                        { title: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } },
                    ],
                },
            },
        ]);

        const returnVal: any = [];

        for (let prompt of listings) {
            returnVal.push({
                _id: prompt!._id!.toString(),
                wallet: prompt.wallet,
                promptLength: prompt.prompt.length,
                seed: prompt?.customization?.[3] || 0,
                type: prompt.type,
                title: prompt.title,
                description: prompt.description,
                price: prompt.price,
                currency: prompt.currency,
                preview: prompt.preview,
                sales: prompt.sales,
                date: prompt.date,
            });
        }

        return returnVal;
    } catch (e) {
        console.error(e);
        return [];
    }
}
