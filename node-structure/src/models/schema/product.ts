import { Schema } from "mongoose";

export const productSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, 'Product Mame is required.'] },
    image: { type: String, required: [true, 'Images is required.'] },
    description: { type: String, default: "" },
    sale_rate: { type: Number, required: [true, 'Sale Rate is required.'] },
    list_rate: { type: Number, required: [true, 'List Rate is required.'] },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required.'] },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
    status: { type: Boolean, default: true }
}, { collection: 'product' });