import mongoose from "mongoose";

export const withdrawRequestSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    request_date_time: { type: Date, default: new Date().toISOString() },
    customer: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Customer", required: [true, "Customer required."] },
    amount : { type: Number, default: null, required: [true, "Amount required."] },  
    currency_code : { type: String, default: "", required: [true, "Currency Code required."] },  
    transaction_type: { type: Number, default: null, required: [true, "Transaction Type required."] }, 
    bank: { type:mongoose.Schema.Types.ObjectId, ref: "CustomerBank"  },
    upi_id: { type:mongoose.Schema.Types.ObjectId, ref: "CustomerUpi"  },
    pay_id: { type:mongoose.Schema.Types.ObjectId, ref: "CustomerPayId"  },
    interac_id: { type:mongoose.Schema.Types.ObjectId, ref: "CustomerInterac" },
	transact_id  : { type: String, default: "" },  
	hypto_ref_id  : { type: String, default: "" },  
    approval_type : { type: Number, default: null },  
    status: { type: Number, default: 1 }  
}, { collection: "withdraw_request" });

export const WithdrawRequest = mongoose.model("WithdrawRequest", withdrawRequestSchema);
