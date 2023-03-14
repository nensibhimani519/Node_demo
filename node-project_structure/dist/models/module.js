"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeArray = exports.Module = exports.moduleSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.moduleSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    name: {
        type: String,
        required: [true, "The name is required."],
        maxlength: 100,
    },
    type: { type: Number, required: [true, "The type is required."] },
    parent: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: null,
        ref: "Module",
    },
    position: { type: Number, required: [true, "The position is required."] },
    is_hidden: { type: Number, default: 0 },
    icon: { type: String, maxlength: 100, default: "" },
    link: { type: String, maxlength: 200, default: "" },
    other_icon: { type: String, maxlength: 100, default: "" },
    other_link: { type: String, maxlength: 200, default: "" },
    search_keyword: { type: String, maxlength: 200, default: "" },
    count_key: { type: String, default: "" },
}, { collection: "module" });
exports.Module = mongoose_1.default.model("Module", exports.moduleSchema);
exports.typeArray = { 0: "Menu", 1: "Module", 2: "Separator" };
//# sourceMappingURL=module.js.map