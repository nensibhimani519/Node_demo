"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const customer_1 = require("../../../models/customer");
const validateSendOtp = (data) => {
    const schema = joi_1.default.object({
        country_code: joi_1.default.string().required().label('Country Code'),
        mobile_no: joi_1.default.string().required().max(10).label('Mobile No.'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateVerifyOtp = (data) => {
    const schema = joi_1.default.object({
        country_code: joi_1.default.string().required().label('Country Code'),
        mobile_no: joi_1.default.string().required().max(10).label('Mobile No.'),
        otp: joi_1.default.number().required().label('OTP'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateSendOtp(req.body);
    if (error)
        throw error;
    let customer = yield customer_1.Customer.findOne({ country_code: req.body.country_code, mobile_no: req.body.mobile_no });
    if (!customer)
        return res.status(404).json({ message: "No record found." });
    customer.otp = 1234;
    customer = yield customer.save();
    res.status(200).json({ message: "OTP send successfully." });
});
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateVerifyOtp(req.body);
    if (error)
        throw error;
    let customer = yield customer_1.Customer.findOne({ country_code: req.body.country_code, mobile_no: req.body.mobile_no, otp: req.body.otp });
    if (!customer)
        return res.status(404).json({ message: "No record found." });
    const token = yield customer.getAccessToken();
    res.status(200).setHeader("x-auth-token", token).json({ message: "Login successfully." });
});
exports.default = { sendOtp, verifyOtp };
//# sourceMappingURL=login.js.map