"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodSchema = void 0;
const mongoose_1 = require("mongoose");
exports.prodSchema = new mongoose_1.Schema({
    p_code: {
        type: String,
        required: [true, "Product code is required."],
        unique: true,
    },
    stock: {
        type: Number,
        required: [true, "Stock is required."],
    },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
}, { collection: "product" });
//# sourceMappingURL=prod.js.map