"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.notificationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.notificationSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    title: { type: String, default: "", required: [true, "Title required."] },
    description: { type: String, default: "", required: [true, "Description required."] },
    img: { type: String, default: "", required: [true, "Image required."] },
    data: { type: Object, default: null },
    customer: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "Customer" },
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() }
}, { collection: "notification" });
exports.Notification = mongoose_1.default.model("Notification", exports.notificationSchema);
//# sourceMappingURL=notification.js.map