import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    image: { type: String, default: "" },
    image_height_ratio: { type: Number, default: 1, auto: true },
    link: { type: String, default: "" },
    position: { type: Number, default: 10 },
    status: { type: Number, default: 0, enum: [0, 1] }
})

export const categorySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, "Name required."], maxlength: 50 },
    parent: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Category" },
    product_code_category: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "ProductCodeCategory" },
    specifications: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "Specifications" }],
    specification_options: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "Specifications" }],
    banner: [{ type: bannerSchema }],
    description: { type: String, default: "" },
    meta_title: { type: String, default: "", maxlength: 100 },
    meta_desc: { type: String, default: "", maxlength: 200 },
    url_keyword: { type: String, default: "" },
    cid: { type: Number, default: 1, unique: true },
    position: { type: Number, default: 1 },
    status: { type: Number, default: 1, enum: [0, 1] }   
}, { collection: "category" })

export const Category = mongoose.model("Category", categorySchema);
export const statusArray: any = { 0: "Disable", 1: "Enable"}