"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, 'Product Mame is required.'] },
    image: { type: String, required: [true, 'Images is required.'] },
    description: { type: String, default: "" },
    sale_rate: { type: Number, required: [true, 'Sale Rate is required.'] },
    list_rate: { type: Number, required: [true, 'List Rate is required.'] },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required.'] },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
    status: { type: Boolean, default: true }
}, { collection: 'product' });
