"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerBank = exports.customerBankSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.customerBankSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    customer: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "Customer" },
    account_ownership: { type: Number, default: null, required: [true, "Account Ownership required."] },
    currency_code: { type: String, default: "", required: [true, "Currency Code required."] },
    bank_name: { type: String, default: "", required: [true, "Bank Name required."] },
    account_no: { type: String, default: "", required: [true, "Account Number required."] },
    account_name: { type: String, default: "", required: [true, "Account Name required."] },
    bsb: { type: String, default: "" },
    routing_no: { type: String, default: "" },
    transit_no: { type: String, default: "" },
    ifsc_code: { type: String, default: "" },
    pan_card_no: { type: String, default: "" },
    pan_card_filename: { type: String, default: "" },
    sort_code: { type: String, default: "" },
    iban: { type: String, default: "" },
    bic: { type: String, default: "" },
    id_type: { type: Number, default: null },
    id_front_filename: { type: String, default: "" },
    id_back_filename: { type: String, default: "" },
    reject_reason: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "RejectReason" },
    reject_reason_description: { type: String, default: "" },
    verify_hypto_response: { type: String, default: "" },
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }
}, { collection: "customer_bank" });
exports.CustomerBank = mongoose_1.default.model("CustomerBank", exports.customerBankSchema);
//# sourceMappingURL=customer_bank.js.map