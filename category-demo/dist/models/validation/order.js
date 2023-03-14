"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.validate = void 0;
const mongoose_1 = require("mongoose");
const order_1 = require("../schema/order");
const joi_1 = __importDefault(require("joi"));
const Order = (0, mongoose_1.model)("Order", order_1.orderSchema);
exports.Order = Order;
const validate = (data) => {
    const schema = joi_1.default.object({
        p_code: joi_1.default.string().required().max(50).min(3).label("code"),
        order_no: joi_1.default.string().required().max(50).min(3).label("no"),
        qty: joi_1.default.number().integer().required().label("qty"),
        status: joi_1.default.string().required().max(50).min(3).label("status"),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
exports.validate = validate;
//# sourceMappingURL=order.js.map