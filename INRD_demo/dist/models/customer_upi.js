"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerUpi = exports.customerUpiSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.customerUpiSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    customer: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "Customer" },
    currency_code: { type: String, default: "", required: [true, "Currency Code required."] },
    upi_id: { type: String, default: "", required: [true, "Upi Id required."] },
    reject_reason: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "RejectReason" },
    reject_reason_description: { type: String, default: "" },
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }
}, { collection: "customer_upi" });
exports.CustomerUpi = mongoose_1.default.model("CustomerUpi", exports.customerUpiSchema);
//# sourceMappingURL=customer_upi.js.map