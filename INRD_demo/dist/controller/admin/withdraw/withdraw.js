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
const withdraw_request_1 = require("../../../models/withdraw_request");
const validate = (data) => {
    const schema = joi_1.default.object({
        status: joi_1.default.number().empty(1).label('Status'),
        currency_code: joi_1.default.string().empty("").label('Currency Code'),
        from_date: joi_1.default.date().label('From Date'),
        to_date: joi_1.default.date().label('To Date'),
        transaction_type: joi_1.default.number().empty(1).label('Transaction Type'),
        page_no: joi_1.default.number().empty(1).label('Page No'),
        record_per_page: joi_1.default.number().empty(1).label('Record Per Page'),
        sort_by: joi_1.default.string().empty("").label('Sort By'),
        sort_type: joi_1.default.string().empty("").label('Sort Type'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateWithdrawInfo = (data) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().required().label('Id'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const getWithdrawRequestList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let pageNo = req.body.page_no ? req.body.page_no : 1;
    let recordPerPage = req.body.record_per_page ? req.body.record_per_page : 5;
    let sortBy = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType = req.body.sort_type ? req.body.sort_type : -1;
    let allowSortBy = ["currency_code", "status", "transaction_type"];
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
    if (req.body.currency_code)
        filter["currency_code"] = new RegExp(req.body.currency_code, "i");
    if (req.body.transaction_type)
        filter["transaction_type"] = new RegExp(req.body.transaction_type, "i");
    if (req.body.hasOwnProperty('status') && req.body.status !== '')
        filter['status'] = req.body.status;
    if (req.body.from_date && req.body.from_date !== '') {
        let dateFrom = saveFromDate(req.body.from_date);
        filter['date'] = { '$gte': dateFrom };
    }
    if (req.body.to_date && req.body.to_date !== '') {
        let dateTo = saveToDate(req.body.to_date);
        filter['date'] = { '$lte': dateTo };
    }
    let result = {};
    if (pageNo == 1) {
        let totalRecords = yield withdraw_request_1.WithdrawRequest.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.data = yield withdraw_request_1.WithdrawRequest.find({ $and: [filter] }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json({ message: "The record has fetched successfully.", data: result });
});
const getWithdrawRequestInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateWithdrawInfo(req.body);
    if (error)
        throw error;
    let data = {};
    let withdraw = yield withdraw_request_1.WithdrawRequest.findOne({ _id: req.body._id });
    if (!withdraw)
        return res.status(404).json({ message: "No record found." });
    data.withdraw = lodash_1.default.assign(withdraw, lodash_1.default.pick(req.body, ["currency_code"]));
    res.status(200).json({ message: "The reacord has fetch successfully.", data: data });
});
const approveWithdrawRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateWithdrawInfo(req.body);
    if (error)
        throw error;
    let withdraw = yield withdraw_request_1.WithdrawRequest.findOne({ _id: req.body._id });
    if (!withdraw)
        return res.status(404).json({ message: "No recored found." });
    withdraw.status = 2;
    withdraw.updated_on = new Date().toISOString();
    withdraw = withdraw.save();
    res.status(200).json({ message: "The reacord has withdraw request approved successfully." });
});
const rejectWithdrawRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateWithdrawInfo(req.body);
    if (error)
        throw error;
    let withdraw = yield withdraw_request_1.WithdrawRequest.findOne({ _id: req.body._id });
    if (!withdraw)
        return res.status(404).json({ message: "No recored found." });
    withdraw.status = 3;
    withdraw.updated_on = new Date().toISOString();
    withdraw = withdraw.save();
    res.status(200).json({ message: "The record has rejected withdraw request." });
});
exports.default = { getWithdrawRequestList, getWithdrawRequestInfo, approveWithdrawRequest, rejectWithdrawRequest };
//# sourceMappingURL=withdraw.js.map