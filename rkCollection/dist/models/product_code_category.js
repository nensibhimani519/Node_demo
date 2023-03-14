"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusArray = exports.ProductCodeCategory = exports.productCodeCategorySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.productCodeCategorySchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, "Name required."], maxlength: 100 },
    prefix: { type: String, unique: true, maxlength: 3 },
    start_number: { type: Number, default: 1 },
    status: { type: Number, default: 1, enum: [0, 1] }
}, { collection: "product_code_category" });
exports.ProductCodeCategory = mongoose_1.default.model("ProductCodeCategory", exports.productCodeCategorySchema);
exports.statusArray = { 0: "Disable", 1: "Enable" };
//# sourceMappingURL=product_code_category.js.map