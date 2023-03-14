import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { encrypt } from "../helper/encription";
import config  from "../config/default.json";

export const customerSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    fullname : { type: String, default: "" },  
    email_id: { type: String, default: "", unique: true }, 
    address: { type: String, default: "" }, 
    city: { type: String, default: "" }, 
    postal_code: { type: String, default: "" }, 
    state: { type: String, default: "" }, 
    country: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "Country" },
    country_code: { type: Number, default: null }, 
    mobile_no: { type: String, default: "", maxlength: 10 }, 
    mpin: { type: String, default: "" }, 
    otp: { type: Number, default: null }, 
    inrd_no: { type: String, default: "" }, 
    inr_wallet_balance: { type: Number, default: "" }, 
    reference_id: { type: String, default: "" }, 
	referred_id : { type: String, default: "" }, 
	kyc_type : { type: Number, default: null }, 
    kyc_created_at: { type: Date, default: new Date().toISOString() }, 
    kyc_status: { type: Number, default: 1 },
	sumsub_reference_id : { type: String, default: "" }, 
    last_login_date_time: { type: Date, default: new Date().toISOString() }, 
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }    
}, { collection: "customer" });

customerSchema.methods.getAccessToken = function () {
    const token = jwt.sign({ cid: this._id }, config.jwtPrivateKey);
    return encrypt(token);
}

export const Customer = mongoose.model("Customer", customerSchema);
