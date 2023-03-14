"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceToken = exports.deviceTokenSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.deviceTokenSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    fcm_token: { type: String, default: "", required: [true, "Fcm Token required."] },
    customer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Customer", required: [true, "Customer required."] },
}, { collection: "device_token" });
exports.DeviceToken = mongoose_1.default.model("DeviceToken", exports.deviceTokenSchema);
//# sourceMappingURL=device_token.js.map