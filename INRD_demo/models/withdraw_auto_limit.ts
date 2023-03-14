import mongoose from "mongoose";

export const withdrawAutoLimitSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    currency_code : { type: String, default: "", required: [true, "Currency Code required."] },  
    amount : { type: String, default: "", required: [true, "Amount required."] },  
}, { collection: "withdraw_auto_limit" });

export const WithdrawAutoLimit = mongoose.model("WithdrawAutoLimit", withdrawAutoLimitSchema);
