"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = exports.currencySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.currencySchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    currency_code: { type: String, default: "", required: [true, "Currency Code required."] },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }
}, { collection: "currency" });
exports.Currency = mongoose_1.default.model("Currency", exports.currencySchema);
//# sourceMappingURL=currency.js.map