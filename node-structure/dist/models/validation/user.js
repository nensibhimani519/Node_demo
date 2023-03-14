"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = exports.User = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const user_1 = require("../schema/user");
const User = (0, mongoose_1.model)('Users', user_1.userSchema);
exports.User = User;
const validateAuth = (data) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required().label('Username'),
        password: joi_1.default.string().required().min(8).max(14).label("Password")
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
exports.validateAuth = validateAuth;
