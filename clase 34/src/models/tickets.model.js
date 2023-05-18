import mongoose, { model } from "mongoose";
import { v4 } from "uuid";

export const ticketSchema = mongoose.Schema({
    code: {type: String, default: v4},
    purchase_datetime: {type: Date, required: true},
    amount: {type: Number, default: true},
    purchaser: {type: String, required: true}
}, {
    timestamps: true
})
