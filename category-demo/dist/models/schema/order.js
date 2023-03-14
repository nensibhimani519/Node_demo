"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderSchema = new mongoose_1.Schema({
    p_code: {
        type: String,
        required: [true, "Product code is required."],
    },
    order_no: {
        type: String,
        required: [true, "Product code is required."],
        unique: true,
    },
    qty: {
        type: Number,
        required: [true, "Stock is required."],
    },
    status: {
        type: String,
        required: [true, "Status is required."],
    },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
}, { collection: "order" });
//# sourceMappingURL=order.js.map