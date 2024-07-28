"use server";

import connectDB from "@/db/connect";
import listingDB from "@/db/models/Listing";
import { GPTModels, PromptTypes } from "@/data/PromptTypes";

type promptType = keyof (typeof PromptTypes)["types"];

export default async function GetMostRecentPrompts(n: number = 10, type?: promptType | Array<promptType>) {
    await connectDB();

    const query: any = [{ $sort: { date: -1 } }, { $limit: n }];

    if (type && typeof type === "string") {
        query.unshift({ $match: { type } });
    } else if (type && typeof type === "object") {
        query.unshift({ $match: { type: { $in: GPTModels } } });
    }

    // Get most recent n entries
    const mostRecentPrompts = await listingDB.aggregate(query);

    return mostRecentPrompts.map((m: any) => ({
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
