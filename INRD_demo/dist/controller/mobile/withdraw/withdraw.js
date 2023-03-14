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
const lodash_1 = __importDefault(require("lodash"));
const joi_1 = __importDefault(require("joi"));
const currency_1 = require("../../../models/currency");
const withdraw_request_1 = require("../../../models/withdraw_request");
const validateWithdrawRequest = (data) => {
    const schema = joi_1.default.object({
        currency_code: joi_1.default.string().required().label('Currency Code'),
        amount: joi_1.default.number().required().label('Amount'),
        transaction_type: joi_1.default.number().required().label('Transaction Type'),
        bank: joi_1.default.alternatives().conditional('transaction_type', { is: 1, then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('Bank'),
        upi_id: joi_1.default.alternatives().conditional('transaction_type', { is: 2, then: joi_1.default.string().hex().length(24).required(), otherwise: joi_1.default.string().empty("") }).label('Upi ID'),
        pay_id: joi_1.default.alternatives().conditional('transaction_type', { is: 3, then: joi_1.default.string().hex().length(24).required(), otherwise: joi_1.default.string().empty("") }).label('Pay ID'),
        interac_id: joi_1.default.alternatives().conditional('transaction_type', { is: 4, then: joi_1.default.string().hex().length(24).required(), otherwise: joi_1.default.string().empty("") }).label('Interac ID'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const getCurrencyList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    let currencyList = yield currency_1.Currency.find().select({ currency_code: 1 });
    let totalRecords = yield currency_1.Currency.find({}).countDocuments();
    data.currency = currencyList;
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
});
const addWithdrawRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateWithdrawRequest(req.body);
    if (error)
        throw error;
    let withdrawRequest = new withdraw_request_1.WithdrawRequest(lodash_1.default.pick(req.body, ["currency_code", "amount", "transaction_type", "bank", "upi_id", "pay_id", "interac_id"]));
    withdrawRequest.customer = req.body._cid;
    withdrawRequest = withdrawRequest.save();
    res.status(200).json({ message: "The record has saved successfully." });
});
const getWithdrawRequestList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    let withdrawRequestList = yield withdraw_request_1.WithdrawRequest.find({ customer: req.body._cid, currency_code: req.body.currency_code })
        .populate("bank", { account_ownership: 1, currency_code: 1, bank_name: 1, accpunt_no: 1, account_name: 1, bsb_no: 1, routing_no: 1, transit_no: 1, ifsc_code: 1, pan_card_no: 1, pan_card_filename: 1, sort_code: 1, iban: 1, bic: 1 })
        .populate("pay_id", { pay_id: 1 })
        .populate("upi_id", { upi_id: 1 })
        .populate("interac_id", { interac_id: 1 })
        .select({ request_date_time: 1, amount: 1, bank: 1, pay_id: 1, upi_id: 1, interac_id: 1, currency_code: 1, transaction_type: 1, status: 1 });
    let totalRecords = yield withdraw_request_1.WithdrawRequest.find({ customer: req.body._cid, currency_code: req.body.currency_code }).countDocuments();
    data.withdraw_request = withdrawRequestList;
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
});
exports.default = { getCurrencyList, addWithdrawRequest, getWithdrawRequestList };
//# sourceMappingURL=withdraw.js.map