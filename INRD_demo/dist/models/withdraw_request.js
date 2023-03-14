"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawRequest = exports.withdrawRequestSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.withdrawRequestSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    request_date_time: { type: Date, default: new Date().toISOString() },
    customer: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "Customer", required: [true, "Customer required."] },
    amount: { type: Number, default: null, required: [true, "Amount required."] },
    currency_code: { type: String, default: "", required: [true, "Currency Code required."] },
    transaction_type: { type: Number, default: null, required: [true, "Transaction Type required."] },
    bank: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "CustomerBank" },
    upi_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "CustomerUpi" },
    pay_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "CustomerPayId" },
    interac_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "CustomerInterac" },
    transact_id: { type: String, default: "" },
    hypto_ref_id: { type: String, default: "" },
    approval_type: { type: Number, default: null },
    status: { type: Number, default: 1 }
}, { collection: "withdraw_request" });
exports.WithdrawRequest = mongoose_1.default.model("WithdrawRequest", exports.withdrawRequestSchema);
//# sourceMappingURL=withdraw_request.js.map