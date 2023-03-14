import mongoose from "mongoose";

export const customerPayIdSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    customer: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Customer" },
    currency_code: { type: String, default: "", required: [true, "Currency Code required."] },  
    pay_id: { type: String, default: "", required: [true, "Pay Id required."] },  
    reject_reason: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "RejectReason" },
    reject_reason_description: { type: String, default: "" }, 
    status: { type: Number, default: 1 }, 
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() } 
}, { collection: "customer_pay_id" });

export const CustomerPayId = mongoose.model("CustomerPayId", customerPayIdSchema);