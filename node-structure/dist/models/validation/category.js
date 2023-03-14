"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const category_1 = require("../schema/category");
const Category = (0, mongoose_1.model)("Category", category_1.categorySchema);
exports.Category = Category;
const validate = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().max(50).min(3).label('Name')
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
exports.validate = validate;
