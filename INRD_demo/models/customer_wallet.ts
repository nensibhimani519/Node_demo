import mongoose from "mongoose";

export const customerWalletSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    customer: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Customer", required: [true, "Customer required."] },
    currency_code : { type: String, default: "", required: [true, "Currency Code required."] },  
    balance: { type: Number, default: "" },  
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() } 
}, { collection: "customer_wallet" });

export const CustomerWallet = mongoose.model("CustomerWallet", customerWalletSchema);