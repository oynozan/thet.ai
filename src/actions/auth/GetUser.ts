"use server";

import connectDB from "@/db/connect";
import { TNetwork } from "@/lib/states";
import userDB, { type IUser } from "../../db/models/User";

export default async function GetUser(wallet: string, network: TNetwork): Promise<IUser | null> {
    await connectDB();

    const user = (await userDB
        .findOne(
            { wallet, network },
            {
                _id: 0,
                wallet: 1,
                confirmed: 1,
                lastPreview: 1,
                history: 1,
            },
        )
        .lean()) as IUser;

    if (!user) return null;
    return user;
}
