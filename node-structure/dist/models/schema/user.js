"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("config"));
const encription_1 = require("../../helper/encription");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.userSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, 'Name is required.'] },
    email: { type: String, required: [true, 'Email is  required.'], unique: [true, 'Email is already exists.'] },
    password: { type: String, required: [true, 'Password is required.'] },
    status: { type: Boolean, default: "" }
}, { collection: 'user' });
exports.userSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ uid: this._id }, config_1.default.get('jwtPrivateKey'));
    return (0, encription_1.encrypt)(token);
};
