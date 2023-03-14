import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    image: { type: String, default: "" },
    image_height_ratio: { type: Number, default: 1, auto: true },
    link: { type: String, default: "" },
    position: { type: Number, default: 10 },
    status: { type: Number, default: 0, enum: [0, 1] }
})

export const collectionSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, default: "", required: [true, "Name required."], maxlength: 50 },
    categories: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "Category" }],
    specifications: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "Specifications" }],
    specification_options : [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "Specifications" }],
    product_filter_tags: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "ProductFilterTags" }],
    max_rate: { type: Number, default: 0 },
    min_rate: { type: Number, default: 0 },
    disc_perc: { type: Number, default: 0 },
    banner: [{ type: bannerSchema }],
    description: { type: String, default: "" },
    meta_title: { type: String, default: "", maxlength: 100 },
    meta_desc: { type: String, default: "", maxlength: 200 },
    url_keyword: { type: String, default: "" },
    cid: { type: Number, default: 1, unique: true }
}, { collection: "collections" })

export const Collections = mongoose.model("Collections", collectionSchema);
export const statusArray: any = { 0: "Disable", 1: "Enable"}