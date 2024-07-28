import { model, models, Schema } from "mongoose";
import { Networks } from "@/data/Networks";

const userSchema = new Schema({
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
        type: [
            new Schema(
                {
                    sold: {
                        type: new Schema(
                            {
                                id: String,
                                amount: Number,
                                currency: String,
                                date: Date,
                            },
                            { _id: false },
                        ),
                        required: false,
                    },
                    bought: {
                        type: new Schema(
                            {
                                id: String,
                                amount: Number,
                                currency: String,
                                date: Date,
                            },
                            { _id: false },
                        ),
                        required: false,
                    },
                    swapped: {
                        type: new Schema(
                            {
                                amount: Number,
                                direction: String,
                                date: Date,
                            },
                            { _id: false },
                        ),
                        required: false,
                    },
                    preview: {
                        type: new Schema(
                            {
                                model: String,
                                date: Date,
                            },
                            { _id: false },
                        ),
                        required: false,
                    },
                },
                { _id: false },
            ),
        ],
        default: [],
    },
});

export default models?.users || model("users", userSchema);
