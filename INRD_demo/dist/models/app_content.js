"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppContent = exports.appContentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.appContentSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    content_code: { type: String, default: "", required: [true, "Content Code required."] },
    description: { type: String, default: "", required: [true, "Description required."] },
}, { collection: "app_content" });
exports.AppContent = mongoose_1.default.model("AppContent", exports.appContentSchema);
//# sourceMappingURL=app_content.js.map