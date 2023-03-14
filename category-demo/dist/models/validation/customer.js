"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = exports.validate = void 0;
const mongoose_1 = require("mongoose");
const customer_1 = require("../schema/customer");
const joi_1 = __importDefault(require("joi"));
const Customer = (0, mongoose_1.model)("Customer", customer_1.customerSchema);
exports.Customer = Customer;
const validate = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().max(50).min(4).label("name"),
        email: joi_1.default.string().required().label("email"),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
exports.validate = validate;
//# sourceMappingURL=customer.js.map