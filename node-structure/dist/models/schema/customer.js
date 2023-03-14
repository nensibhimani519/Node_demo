"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSchema = void 0;
const mongoose_1 = require("mongoose");
exports.customerSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, "Name is required."] },
    email: { type: String, required: [true, "Email is required."] },
    mobile: { type: String, required: [true, "Mobile is required."] },
    otp: { type: String, default: "" },
}, { collection: "customer" });
