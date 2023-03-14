import mongoose from "mongoose";

export const rejectReasonSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    description : { type: String, default: "", required: [true, "Description required."] },  
    status: { type: Number, default: 1 }  
}, { collection: "reject_reason" });

export const RejectReason = mongoose.model("RejectReason", rejectReasonSchema);
