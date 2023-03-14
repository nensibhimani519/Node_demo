"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeArray = exports.statusArray = exports.Specifications = exports.specificationsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const optionsSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, "Name required."], maxlength: 50 },
    code: { type: String, default: "", maxlength: 3, match: [/^[-A-Z0-9\._]*$/, "Enter valid code."] },
    color_code: { type: String, default: "", maxlength: 7 }
});
exports.specificationsSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    type: { type: Number, required: [true, "Type required."], enum: [1, 2] },
    name: { type: String, required: [true, "Name required."], maxlength: 50 },
    is_variant: { type: Number, default: 0 },
    options: [{ type: optionsSchema }],
    status: { type: Number, default: 1, enum: [0, 1] }
}, { collection: "specifications" });
exports.Specifications = mongoose_1.default.model("Specifications", exports.specificationsSchema);
exports.statusArray = { 0: "Disable", 1: "Enable" };
exports.typeArray = { 1: "Input", 2: "Color" };
//# sourceMappingURL=specifications.js.map