"use server";

import connectDB from "@/db/connect";
import { TNetwork } from "@/lib/states";
import listingDB from "@/db/models/Listing";
import { GPTModels, type TPromptType } from "@/data/PromptTypes";

export default async function GetBestSellingPrompts(network: TNetwork, n: number = 10, type?: TPromptType) {
    await connectDB();

    const query: any = [{ $match: { network } }, { $sort: { sales: 1 } }, { $limit: n }];

    if (type && typeof type === "string") {
        query[0].$match["type"] = type;
    } else if (type && typeof type === "object") {
        query[0].$match["type"] = { $in: GPTModels };
    }

    // Get most recent n entries
    const bestSellingPrompts = await listingDB.aggregate(query);

    return bestSellingPrompts.map((m: any) => ({
        _id: m._id.toString(),
        wallet: m.wallet,
        type: m.type,
        title: m.title,
        description: m.description,
        price: m.price,
        currency: m.currency,
        preview: m.preview,
        date: m.date,
    }));
}
