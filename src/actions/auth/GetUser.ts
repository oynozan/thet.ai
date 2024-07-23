"use server";

import connectDB from '@/db/connect';
import userDB from "../../db/models/User";

interface IUser {
    wallet: string;
    confirmed: boolean;
    lastPreview: Date;
    history: Array<{
        sold?: {
            id: string;
            amount: number;
            currency: string;
            date: Date;
        };
        bought?: {
            id: string;
            amount: number;
            currency: string;
            date: Date;
        };
        swapped?: {
            amount: number;
            direction: string;
            date: Date;
        };
    }>;
}

export default async function GetUser(wallet: string): Promise<IUser | null> {
    await connectDB();

    const user = (await userDB
        .findOne(
            { wallet },
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
