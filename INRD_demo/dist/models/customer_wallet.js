"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerWallet = exports.customerWalletSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.customerWalletSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    customer: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "Customer", required: [true, "Customer required."] },
    currency_code: { type: String, default: "", required: [true, "Currency Code required."] },
    balance: { type: Number, default: "" },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }
}, { collection: "customer_wallet" });
exports.CustomerWallet = mongoose_1.default.model("CustomerWallet", exports.customerWalletSchema);
//# sourceMappingURL=customer_wallet.js.map