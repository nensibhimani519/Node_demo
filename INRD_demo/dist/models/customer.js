"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.customerSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const encription_1 = require("../helper/encription");
const default_json_1 = __importDefault(require("../config/default.json"));
exports.customerSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    fullname: { type: String, default: "" },
    email_id: { type: String, default: "", unique: true },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    postal_code: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "Country" },
    country_code: { type: Number, default: null },
    mobile_no: { type: String, default: "", maxlength: 10 },
    mpin: { type: String, default: "" },
    otp: { type: Number, default: null },
    inrd_no: { type: String, default: "" },
    inr_wallet_balance: { type: Number, default: "" },
    reference_id: { type: String, default: "" },
    referred_id: { type: String, default: "" },
    kyc_type: { type: Number, default: null },
    kyc_created_at: { type: Date, default: new Date().toISOString() },
    kyc_status: { type: Number, default: 1 },
    sumsub_reference_id: { type: String, default: "" },
    last_login_date_time: { type: Date, default: new Date().toISOString() },
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }
}, { collection: "customer" });
exports.customerSchema.methods.getAccessToken = function () {
    const token = jsonwebtoken_1.default.sign({ cid: this._id }, default_json_1.default.jwtPrivateKey);
    return (0, encription_1.encrypt)(token);
};
exports.Customer = mongoose_1.default.model("Customer", exports.customerSchema);
//# sourceMappingURL=customer.js.map