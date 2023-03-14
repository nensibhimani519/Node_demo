"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prod = exports.validate = void 0;
const mongoose_1 = require("mongoose");
const prod_1 = require("../schema/prod");
const joi_1 = __importDefault(require("joi"));
const Prod = (0, mongoose_1.model)("Prod", prod_1.prodSchema);
exports.Prod = Prod;
const validate = (data) => {
    const schema = joi_1.default.object({
        p_code: joi_1.default.string().required().max(50).min(3).label("Product code"),
        stock: joi_1.default.number().integer().required().label("stock"),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
exports.validate = validate;
//# sourceMappingURL=prod.js.map