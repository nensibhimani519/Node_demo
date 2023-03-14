"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectReason = exports.rejectReasonSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.rejectReasonSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    description: { type: String, default: "", required: [true, "Description required."] },
    status: { type: Number, default: 1 }
}, { collection: "reject_reason" });
exports.RejectReason = mongoose_1.default.model("RejectReason", exports.rejectReasonSchema);
//# sourceMappingURL=reject_reason.js.map