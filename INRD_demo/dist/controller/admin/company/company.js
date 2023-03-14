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
const lodash_1 = __importDefault(require("lodash"));
const company_1 = require("../../../models/company");
const validate = (data) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().required().label("Id"),
        help: joi_1.default.object({
            twitter_link: joi_1.default.string().empty("").label('Twitter Link'),
            whatsapp_link: joi_1.default.string().empty("").label('Whatsapp Link'),
            discord_link: joi_1.default.string().empty("").label('Discord Link'),
            email_id: joi_1.default.string().empty("").label('Email'),
            call: joi_1.default.string().required().label('Call'),
            telegram_link: joi_1.default.string().empty("").label('Telegram Link'),
        }).label("help")
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateAdd = (data) => {
    const schema = joi_1.default.object({
        help: joi_1.default.object({
            twitter_link: joi_1.default.string().empty("").label('Twitter Link'),
            whatsapp_link: joi_1.default.string().empty("").label('Whatsapp Link'),
            discord_link: joi_1.default.string().empty("").label('Discord Link'),
            email_id: joi_1.default.string().empty("").label('Email'),
            call: joi_1.default.string().required().label('Call'),
            telegram_link: joi_1.default.string().empty("").label('Telegram Link'),
        }).label("help")
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const getSocialMediaLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    let companyList = yield company_1.Company.find({});
    data.social_media_links = companyList;
    res.status(200).json({ message: "The record has fetched successfully.", data: data });
});
const updateSocialMediaLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let company = yield company_1.Company.findOne({ _id: req.body._id });
    if (!company)
        res.status(404).json({ message: "No record found." });
    company = lodash_1.default.assign(company, lodash_1.default.pick(req.body, ["help"]));
    company.updated_at = new Date().toISOString();
    company = company.save();
    res.status(200).json({ message: "The record has updated successfully." });
});
const addSocialLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateAdd(req.body);
    if (error)
        throw error;
    let announcement = new company_1.Company(lodash_1.default.pick(req.body, ["help"]));
    announcement = announcement.save();
    res.status(200).json({ message: "The record has saved successfully." });
});
exports.default = { getSocialMediaLinks, updateSocialMediaLinks, addSocialLinks, };
//# sourceMappingURL=company.js.map