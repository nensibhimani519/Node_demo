"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.validate = void 0;
const mongoose_1 = require("mongoose");
const product_1 = require("../schema/product");
const joi_1 = __importDefault(require("joi"));
const Product = (0, mongoose_1.model)("Product", product_1.productSchema);
exports.Product = Product;
const validate = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().max(50).min(3).label("name"),
        price: joi_1.default.number().integer().required().label("price"),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
exports.validate = validate;
//# sourceMappingURL=product.js.map