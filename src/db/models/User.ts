import { model, models, Schema } from "mongoose";

import { Networks } from "@/data/Networks";

export interface IUser {
    wallet: string;
    network: (typeof Networks)[number];
    confirmed: boolean;
    lastPreview: Date;
    history: {
        sold?: Array<{
            id: string;
            amount: number;
            currency: string;
            date: Date;
        }>;
        bought?: Array<{
            id: string;
            amount: number;
            currency: string;
            date: Date;
        }>;
        swapped?: Array<{
            amount: number;
            direction: string;
            date: Date;
        }>;
        preview?: Array<{
            model: string;
            date: Date;
        }>;
    };
}

const userSchema = new Schema<IUser>({
    wallet: {
        type: String,
        required: true,
    },
    network: {
        type: String,
        enum: Networks,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
        required: true,
    },
    history: {
        type: new Schema(
            {
                sold: [
                    new Schema(
                        {
                            id: String,
                            amount: Number,
                            currency: String,
                            date: Date,
                        },
                        { _id: false },
                    ),
                ],
                bought: [
                    new Schema(
                        {
                            id: String,
                            amount: Number,
                            currency: String,
                            date: Date,
                        },
                        { _id: false },
                    ),
                ],
                swapped: [
                    new Schema(
                        {
                            amount: Number,
                            direction: String,
                            date: Date,
                        },
                        { _id: false },
                    ),
                ],
                preview: [
                    new Schema(
                        {
                            model: String,
                            date: Date,
                        },
                        { _id: false },
                    ),
                ],
            },
            { _id: false },
        ),
        default: {
            sold: [],
            bought: [],
            swapped: [],
            preview: [],
        },
    },
});

export default models?.users || model("users", userSchema);
