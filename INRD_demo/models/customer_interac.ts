import mongoose from "mongoose";

export const customerInteracSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    customer: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "Customer" },
    currency_code: { type: String, default: "", required: [true, "Currency Code required."] },  
    interac_id: { type: String, default: "", required: [true, "Upi Id required."] },  
    reject_reason: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "RejectReason" },
    reject_reason_description: {type: String, default: "" }, 
    status: { type: Number, default: 1 }, 
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }  
}, { collection: "customer_interac" });

export const CustomerInterac = mongoose.model("CustomerInterac", customerInteracSchema);