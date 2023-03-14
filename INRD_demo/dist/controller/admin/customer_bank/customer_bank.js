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
const customer_bank_1 = require("../../../models/customer_bank");
const validateBank = (data) => {
    const schema = joi_1.default.object({
        account_ownership: joi_1.default.number().label('Account Ownership'),
        currency_code: joi_1.default.string().label('Currency Code'),
        bank_name: joi_1.default.string().label('Bank Name'),
        account_no: joi_1.default.string().label('Account No'),
        account_name: joi_1.default.string().label('Account Name'),
        bsb: joi_1.default.alternatives().conditional('currency_code', {
            switch: [
                { is: "AUD", then: joi_1.default.string() },
                { is: "SGD", then: joi_1.default.string() },
                { is: "NZD", then: joi_1.default.string() },
            ],
            otherwise: joi_1.default.string().empty("")
        }).label("BSB"),
        routing_no: joi_1.default.alternatives().conditional('currency_code', { is: "USD", then: joi_1.default.string(), otherwise: joi_1.default.string().empty("") }).label('Rounting No'),
        transit_no: joi_1.default.alternatives().conditional('currency_code', { is: "CAD", then: joi_1.default.string(), otherwise: joi_1.default.string().empty("") }).label('Transit No'),
        ifsc_code: joi_1.default.alternatives().conditional('currency_code', { is: "INR", then: joi_1.default.string(), otherwise: joi_1.default.string().empty("") }).label('IFSC Code'),
        pan_card_no: joi_1.default.alternatives().conditional('currency_code', { is: "INR", then: joi_1.default.string(), otherwise: joi_1.default.string().empty("") }).label('Pan Card No'),
        pan_card_filename: joi_1.default.alternatives().conditional('currency_code', { is: "INR", then: joi_1.default.string(), otherwise: joi_1.default.string().empty("") }).label('Pan Card Filename'),
        sort_code: joi_1.default.alternatives().conditional('currency_code', { is: "INR", then: joi_1.default.string(), otherwise: joi_1.default.string().empty("") }).label('Sort Code'),
        iban: joi_1.default.alternatives().conditional('currency_code', { is: "EUR", then: joi_1.default.string(), otherwise: joi_1.default.string().empty("") }).label('IBAN'),
        bic: joi_1.default.alternatives().conditional('currency_code', {
            switch: [
                { is: "EUR", then: joi_1.default.string() },
                { is: "SGD", then: joi_1.default.string() },
            ],
            otherwise: joi_1.default.string().empty("")
        }).label('BIC'),
        id_type: joi_1.default.alternatives().conditional('account_ownership', { is: 2, then: joi_1.default.number(), otherwise: joi_1.default.number().empty(0) }).label("ID Type"),
        id_front_filename: joi_1.default.alternatives().conditional('account_ownership', { is: 2, then: joi_1.default.string(), otherwise: joi_1.default.string().empty("") }).label('ID Front Filename'),
        id_back_filename: joi_1.default.alternatives().conditional('account_ownership', { is: 2, then: joi_1.default.string(), otherwise: joi_1.default.string().empty("") }).label('ID Back Filename'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateBankInfo = (data) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().required().label('Id'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const getBankList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateBank(req.body);
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
        let totalRecords = yield customer_bank_1.CustomerBank.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.data = yield customer_bank_1.CustomerBank.find({ $and: [filter] }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json({ message: "The record has fetched successfully.", data: result });
});
const getBankInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateBankInfo(req.body);
    if (error)
        throw error;
    let data = {};
    let customerBank = yield customer_bank_1.CustomerBank.findOne({ _id: req.body._id });
    if (!customerBank)
        return res.status(404).json({ message: "No record found." });
    data.customerBank = lodash_1.default.assign(customerBank, lodash_1.default.pick(req.body, ["currency_code"]));
    res.status(200).json({ message: "The reacord has fetch successfully.", data: data });
});
exports.default = { getBankList, getBankInfo };
//# sourceMappingURL=customer_bank.js.map