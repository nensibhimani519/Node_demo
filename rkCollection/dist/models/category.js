"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusArray = exports.Category = exports.categorySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bannerSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    image: { type: String, default: "" },
    image_height_ratio: { type: Number, default: 1, auto: true },
    link: { type: String, default: "" },
    position: { type: Number, default: 10 },
    status: { type: Number, default: 0, enum: [0, 1] }
});
exports.categorySchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, "Name required."], maxlength: 50 },
    parent: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "Category" },
    product_code_category: { type: mongoose_1.default.Schema.Types.ObjectId, default: null, ref: "ProductCodeCategory" },
    specifications: [{ type: mongoose_1.default.Schema.Types.ObjectId, default: [], ref: "Specifications" }],
    specification_options: [{ type: mongoose_1.default.Schema.Types.ObjectId, default: [], ref: "Specifications" }],
    banner: [{ type: bannerSchema }],
    description: { type: String, default: "" },
    meta_title: { type: String, default: "", maxlength: 100 },
    meta_desc: { type: String, default: "", maxlength: 200 },
    url_keyword: { type: String, default: "" },
    cid: { type: Number, default: 1, unique: true },
    position: { type: Number, default: 1 },
    status: { type: Number, default: 1, enum: [0, 1] }
}, { collection: "category" });
exports.Category = mongoose_1.default.model("Category", exports.categorySchema);
exports.statusArray = { 0: "Disable", 1: "Enable" };
//# sourceMappingURL=category.js.map