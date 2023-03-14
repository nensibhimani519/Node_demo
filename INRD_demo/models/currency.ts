import mongoose from "mongoose";

export const currencySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  
    currency_code: { type: String, default: "", required: [true, "Currency Code required."] },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }
}, { collection: "currency" });

export const Currency = mongoose.model("Currency", currencySchema);