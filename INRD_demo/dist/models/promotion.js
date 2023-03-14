"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promotion = exports.promotionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.promotionSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    img: { type: String, default: "", required: [true, "Image required."] },
    active_from: { type: Date, default: new Date().toISOString(), required: [true, "Active From required."] },
    active_to: { type: Date, default: new Date().toISOString(), required: [true, "Active To required."] },
    frequency: { type: Number, default: 1 },
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }
}, { collection: "promotion" });
exports.Promotion = mongoose_1.default.model("Promotion", exports.promotionSchema);
//# sourceMappingURL=promotion.js.map