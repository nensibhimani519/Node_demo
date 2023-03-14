"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawAutoLimit = exports.withdrawAutoLimitSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.withdrawAutoLimitSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    currency_code: { type: String, default: "", required: [true, "Currency Code required."] },
    amount: { type: String, default: "", required: [true, "Amount required."] },
}, { collection: "withdraw_auto_limit" });
exports.WithdrawAutoLimit = mongoose_1.default.model("WithdrawAutoLimit", exports.withdrawAutoLimitSchema);
//# sourceMappingURL=withdraw_auto_limit.js.map