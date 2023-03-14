"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusArray = exports.Collections = exports.collectionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bannerSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    image: { type: String, default: "" },
    image_height_ratio: { type: Number, default: 1, auto: true },
    link: { type: String, default: "" },
    position: { type: Number, default: 10 },
    status: { type: Number, default: 0, enum: [0, 1] }
});
exports.collectionSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    name: { type: String, default: "", required: [true, "Name required."], maxlength: 50 },
    categories: [{ type: mongoose_1.default.Schema.Types.ObjectId, default: [], ref: "Category" }],
    specifications: [{ type: mongoose_1.default.Schema.Types.ObjectId, default: [], ref: "Specifications" }],
    specification_options: [{ type: mongoose_1.default.Schema.Types.ObjectId, default: [], ref: "Specifications" }],
    product_filter_tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, default: [], ref: "ProductFilterTags" }],
    max_rate: { type: Number, default: 0 },
    min_rate: { type: Number, default: 0 },
    disc_perc: { type: Number, default: 0 },
    banner: [{ type: bannerSchema }],
    description: { type: String, default: "" },
    meta_title: { type: String, default: "", maxlength: 100 },
    meta_desc: { type: String, default: "", maxlength: 200 },
    url_keyword: { type: String, default: "" },
    cid: { type: Number, default: 1, unique: true }
}, { collection: "collections" });
exports.Collections = mongoose_1.default.model("Collections", exports.collectionSchema);
exports.statusArray = { 0: "Disable", 1: "Enable" };
//# sourceMappingURL=collections.js.map