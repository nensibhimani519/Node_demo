"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
    },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
}, { collection: "product" });
//# sourceMappingURL=product.js.map