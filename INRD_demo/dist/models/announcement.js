"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement = exports.announcementSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.announcementSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    description: { type: String, default: "", required: [true, "Description required."] },
    currency_code: { type: String, default: "" },
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() }
}, { collection: "announcement" });
exports.Announcement = mongoose_1.default.model("Announcement", exports.announcementSchema);
//# sourceMappingURL=announcement.js.map