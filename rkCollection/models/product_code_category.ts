import mongoose from "mongoose";

export const productCodeCategorySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, "Name required."], maxlength: 100 },
    prefix: { type: String, unique: true, maxlength: 3 },
    start_number: { type: Number, default: 1 },
    status: { type: Number, default: 1, enum: [0, 1] }
}, { collection: "product_code_category" })

export const ProductCodeCategory = mongoose.model("ProductCodeCategory", productCodeCategorySchema);
export const statusArray: any = { 0: "Disable", 1: "Enable"}
