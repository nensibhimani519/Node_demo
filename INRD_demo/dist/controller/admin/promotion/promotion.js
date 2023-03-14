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
const promotion_1 = require("../../../models/promotion");
const validate = (data) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().required().label('Id'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateAddPromotion = (data) => {
    const schema = joi_1.default.object({
        img: joi_1.default.string().required().label('Image'),
        active_from: joi_1.default.date().required().label('Active From'),
        active_to: joi_1.default.date().required().label('Active To'),
        frequency: joi_1.default.number().required().label('Frequency'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateUpdatePromotion = (data) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().required().label('Id'),
        img: joi_1.default.string().required().label('Image'),
        active_from: joi_1.default.date().required().label('Active From'),
        active_to: joi_1.default.date().required().label('Active To'),
        frequency: joi_1.default.number().required().label('Frequency'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validatestatus = (data) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().required().label('Id'),
        status: joi_1.default.number().required().label('Status'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const getPromotionList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pageNo = req.body.page_no ? req.body.page_no : 1;
    let recordPerPage = req.body.record_per_page ? req.body.record_per_page : 10;
    let sortBy = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType = req.body.sort_type ? req.body.sort_type : -1;
    let allowSortBy = ["status", "frequency"];
    sortBy = allowSortBy.includes(sortBy) ? sortBy : "_id";
    let sort = {};
    sort[sortBy] = sortType;
    let skip = (pageNo - 1) * recordPerPage;
    let limit = recordPerPage;
    const saveFromDate = (value) => {
        if (!value || value == '')
            return '';
        let date = new Date(value);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return new Date(date).toISOString();
    };
    const saveToDate = (value) => {
        if (!value || value == '')
            return '';
        let newDate = new Date(value);
        newDate.setHours(23);
        newDate.setMinutes(59);
        newDate.setSeconds(59);
        newDate.setMilliseconds(999);
        return new Date(newDate).toISOString();
    };
    let filter = new Object();
    if (req.body.hasOwnProperty('status') && req.body.status !== '')
        filter['status'] = req.body.status;
    if (req.body.hasOwnProperty('frequency') && req.body.frequency !== '')
        filter['frequency'] = req.body.frequency;
    if (req.body.active_from && req.body.active_from !== '') {
        let activeFrom = saveFromDate(req.body.active_from);
        filter['date'] = { '$gte': activeFrom };
    }
    if (req.body.active_to && req.body.active_to !== '') {
        let activeTo = saveToDate(req.body.active_to);
        filter['date'] = { '$lte': activeTo };
    }
    let result = {};
    if (pageNo == 1) {
        let totalRecords = yield promotion_1.Promotion.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.data = yield promotion_1.Promotion.find({ $and: [filter] }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json({ message: "The record has fetched successfully.", data: result });
});
const getPromotionInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let data = {};
    let promotion = yield promotion_1.Promotion.findOne({ _id: req.body._id });
    if (!promotion)
        return res.status(404).json({ message: "No record found." });
    data.promotion = lodash_1.default.assign(promotion, lodash_1.default.pick(req.body, ["img", "active_from", "active_to", "frequency"]));
    res.status(200).json({ message: "The reacord has fetch successfully.", data: data });
});
const addPromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateAddPromotion(req.body);
    if (error)
        throw error;
    let promotion = new promotion_1.Promotion(lodash_1.default.pick(req.body, ["img", "active_from", "active_to", "frequency"]));
    promotion = promotion.save();
    res.status(200).json({ message: "The record has saved successfully." });
});
const updatePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateUpdatePromotion(req.body);
    if (error)
        throw error;
    let promotion = yield promotion_1.Promotion.findOne({ _id: req.body._id });
    if (!promotion)
        res.status(404).json({ message: "No record found." });
    promotion = lodash_1.default.assign(promotion, lodash_1.default.pick(req.body, ["img", "active_from", "active_to", "frequency"]));
    promotion.updated_at = new Date().toISOString();
    promotion = promotion.save();
    res.status(200).json({ message: "The record has updated successfully." });
});
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validatestatus(req.body);
    if (error)
        throw error;
    let promotion = yield promotion_1.Promotion.findOne({ _id: req.body._id });
    if (!promotion)
        return res.status(404).json({ message: "No recored found." });
    promotion.status = !promotion.status;
    promotion.updated_on = new Date().toISOString();
    promotion = promotion.save();
    res.status(200).json({ message: "The status has changed successfully." });
});
const deletePromotion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let promotion = yield promotion_1.Promotion.findOneAndRemove({ _id: req.body._id });
    if (!promotion)
        return res.status(404).json({ message: "No recored found." });
    res.status(200).json({ message: "The record has deleted successfully." });
});
exports.default = { getPromotionList, getPromotionInfo, addPromotion, updatePromotion, changeStatus, deletePromotion };
//# sourceMappingURL=promotion.js.map