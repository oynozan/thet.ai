"use server";

import connectDB from "@/db/connect";
import listingDB from "@/db/models/Listing";

export default async function GetListing(id: string): Promise<any> {
    if (!id) return {};

    await connectDB();

    const prompt: any = await listingDB.findById(id).lean();
    if (!prompt) return {};

    return {
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
    };
}
