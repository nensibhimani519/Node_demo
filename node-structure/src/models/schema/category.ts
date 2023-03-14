import { Schema } from "mongoose";

export const categorySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, 'Category name is required.'] },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
    status: { type: Boolean, default: true }
}, { collection: 'category' });