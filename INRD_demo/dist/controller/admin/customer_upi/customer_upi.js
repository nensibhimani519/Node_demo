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
const customer_upi_1 = require("../../../models/customer_upi");
const validate = (data) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().required().label('Id'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const getUpiList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pageNo = req.body.page_no ? req.body.page_no : 1;
    let recordPerPage = req.body.record_per_page ? req.body.record_per_page : 5;
    let sortBy = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType = req.body.sort_type ? req.body.sort_type : -1;
    let allowSortBy = ["currency_code", "status"];
    sortBy = allowSortBy.includes(sortBy) ? sortBy : "_id";
    let sort = {};
    sort[sortBy] = sortType;
    let skip = (pageNo - 1) * recordPerPage;
    let limit = recordPerPage;
    let filter = new Object();
    if (req.body.currency_code)
        filter["currency_code"] = new RegExp(req.body.currency_code, "i");
    if (req.body.hasOwnProperty('status') && req.body.status !== '')
        filter['status'] = req.body.status;
    let result = {};
    if (pageNo == 1) {
        let totalRecords = yield customer_upi_1.CustomerUpi.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.upi = yield customer_upi_1.CustomerUpi.find({ $and: [filter] }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json({ message: "The record has fetched successfully.", data: result });
});
const getUpiInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let data = {};
    let customerUpi = yield customer_upi_1.CustomerUpi.findOne({ _id: req.body._id });
    if (!customerUpi)
        return res.status(404).json({ message: "No record found." });
    data.upi = lodash_1.default.assign(customerUpi, lodash_1.default.pick(req.body, ["currency_code"]));
    res.status(200).json({ message: "The reacord has fetch successfully.", data: data });
});
exports.default = { getUpiList, getUpiInfo };
//# sourceMappingURL=customer_upi.js.map