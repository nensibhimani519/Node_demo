"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.customerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required."],
    },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
}, { collection: "customer" });
//# sourceMappingURL=customer.js.map