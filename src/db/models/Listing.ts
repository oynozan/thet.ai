import { model, models, Schema } from "mongoose";

const listingSchema = new Schema({
    tx: {
        type: String,
        required: true,
    },
    wallet: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    customization: {
        type: Object,
        required: false,
    },
    preview: {
        type: String,
        required: true
    },
    sales: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true
    }
});

export default models?.listings || model("listings", listingSchema);
