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
const customer_bank_1 = require("../../../models/customer_bank");
const customer_1 = require("../../../models/customer");
const customer_interac_1 = require("../../../models/customer_interac");
const customer_pay_id_1 = require("../../../models/customer_pay_id");
const customer_upi_1 = require("../../../models/customer_upi");
const country_1 = require("../../../models/country");
const upload_1 = require("../../../helper/upload");
const validate = (data) => {
    const schema = joi_1.default.object({
        pin: joi_1.default.string().required().label('Pin'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateUpdatePin = (data) => {
    const schema = joi_1.default.object({
        old_pin: joi_1.default.string().required().label('Old Pin'),
        new_pin: joi_1.default.string().required().label('New Pin'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateBank = (data) => {
    const schema = joi_1.default.object({
        account_ownership: joi_1.default.number().required().label('Account Ownership'),
        currency_code: joi_1.default.string().required().label('Currency Code'),
        bank_name: joi_1.default.string().required().label('Bank Name'),
        account_no: joi_1.default.string().required().label('Account No'),
        account_name: joi_1.default.string().required().label('Account Name'),
        bsb: joi_1.default.alternatives().conditional('currency_code', {
            switch: [
                { is: "AUD", then: joi_1.default.string().required() },
                { is: "SGD", then: joi_1.default.string().required() },
                { is: "NZD", then: joi_1.default.string().required() },
            ],
            otherwise: joi_1.default.string().empty("")
        }).label("BSB"),
        routing_no: joi_1.default.alternatives().conditional('currency_code', { is: "USD", then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('Rounting No'),
        transit_no: joi_1.default.alternatives().conditional('currency_code', { is: "CAD", then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('Transit No'),
        ifsc_code: joi_1.default.alternatives().conditional('currency_code', { is: "INR", then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('IFSC Code'),
        pan_card_no: joi_1.default.alternatives().conditional('currency_code', { is: "INR", then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('Pan Card No'),
        pan_card_filename: joi_1.default.alternatives().conditional('currency_code', { is: "INR", then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('Pan Card Filename'),
        sort_code: joi_1.default.alternatives().conditional('currency_code', { is: "INR", then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('Sort Code'),
        iban: joi_1.default.alternatives().conditional('currency_code', { is: "EUR", then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('IBAN'),
        bic: joi_1.default.alternatives().conditional('currency_code', {
            switch: [
                { is: "EUR", then: joi_1.default.string().required() },
                { is: "SGD", then: joi_1.default.string().required() },
            ],
            otherwise: joi_1.default.string().empty("")
        }).label('BIC'),
        id_type: joi_1.default.alternatives().conditional('account_ownership', { is: 2, then: joi_1.default.number().required(), otherwise: joi_1.default.number().empty(0) }).label("ID Type"),
        id_front_filename: joi_1.default.alternatives().conditional('account_ownership', { is: 2, then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('ID Front Filename'),
        id_back_filename: joi_1.default.alternatives().conditional('account_ownership', { is: 2, then: joi_1.default.string().required(), otherwise: joi_1.default.string().empty("") }).label('ID Back Filename'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateInterac = (data) => {
    const schema = joi_1.default.object({
        currency_code: joi_1.default.string().required().valid("CAD").label('Currency Code'),
        interac_id: joi_1.default.string().required().label('Interac ID'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validatePay = (data) => {
    const schema = joi_1.default.object({
        currency_code: joi_1.default.string().required().valid("AUD").label('Currency Code'),
        pay_id: joi_1.default.string().required().label('Pay ID'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateUpi = (data) => {
    const schema = joi_1.default.object({
        currency_code: joi_1.default.string().required().valid("INR").label('Currency Code'),
        upi_id: joi_1.default.string().required().label('Upi ID'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateProfile = (data) => {
    const schema = joi_1.default.object({
        country: joi_1.default.string().required().label('Country'),
        fullname: joi_1.default.string().empty('').label('Full Name'),
        email_id: joi_1.default.string().empty('').label('Email'),
        Postal_code: joi_1.default.string().empty('').label('Postal Code'),
        city: joi_1.default.string().empty('').label('City'),
        state: joi_1.default.string().empty('').label('State'),
        address: joi_1.default.string().empty('').label('Address'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const checkPin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let customer = yield customer_1.Customer.findOne({ mpin: req.body.pin, _id: req.body._cid });
    if (!customer)
        res.status(404).json({ message: "You entered wrong pin. Please try again!" });
    res.status(200).json({ message: "Pin matched." });
});
const updatePin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateUpdatePin(req.body);
    if (error)
        throw error;
    let customer = yield customer_1.Customer.findOne({ mpin: req.body.old_pin, _id: req.body._cid });
    if (!customer)
        res.status(404).json({ message: "You entered wrong pin. Please try again!" });
    customer.mpin = req.body.new_pin;
    customer = customer.save();
    res.status(200).json({ message: "Pin updated successfully." });
});
const addBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateBank(req.body);
    if (error)
        throw error;
    let customerBank = new customer_bank_1.CustomerBank(lodash_1.default.pick(req.body, ["account_ownership", "currency_code", "bank_name", "account_no", "account_name", "bsb", "routing_no", "transit_no", "ifsc_code", "pan_card_no", "pan_card_filename", "sort_code", "iban", "bic", "id_type", "id_front_filename", "id_back_filename"]));
    customerBank.customer = req.body._cid;
    customerBank = yield customerBank.save();
    res.status(200).json({ message: "The record has saved successfully." });
});
const addInteracID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateInterac(req.body);
    if (error)
        throw error;
    let customerInterac = new customer_interac_1.CustomerInterac(lodash_1.default.pick(req.body, ["interac_id", "currency_code"]));
    customerInterac.customer = req.body._cid;
    customerInterac = customerInterac.save();
    res.status(200).json({ message: "The record has saved successfully." });
});
const addPayID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validatePay(req.body);
    if (error)
        throw error;
    let customerPay = new customer_pay_id_1.CustomerPayId(lodash_1.default.pick(req.body, ["pay_id", "currency_code"]));
    customerPay.customer = req.body._cid;
    customerPay = customerPay.save();
    res.status(200).json({ message: "The record has saved successfully." });
});
const addUpiID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateUpi(req.body);
    if (error)
        throw error;
    let customerUpi = new customer_upi_1.CustomerUpi(lodash_1.default.pick(req.body, ["upi_id", "currency_code"]));
    customerUpi.customer = req.body._cid;
    customerUpi = customerUpi.save();
    res.status(200).json({ message: "The record has saved successfully." });
});
const getBankList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let banks = yield customer_bank_1.CustomerBank.find({ currency_code: req.body.currency_code, customer: req.body._cid });
    if (banks.length === 0)
        res.status(404).json({ message: "No record found." });
    res.status(200).json({ message: "The record has fetched successfully.", data: banks });
});
const getInteracIdList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    let customerInterac = yield customer_interac_1.CustomerInterac.find({ currency_code: req.body.currency_code, customer: req.body._cid }).select({ currency_code: 1, interac_id: 1, reject_reason_description: 1, status: 1 });
    if (customerInterac.length === 0)
        res.status(404).json({ message: "No record found." });
    data.interac_ids = customerInterac;
    res.status(200).json({ message: "The record has fetched successfully.", data: data });
});
const getPayIdList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    let customerPay = yield customer_pay_id_1.CustomerPayId.find({ currency_code: req.body.currency_code, customer: req.body._cid }).select({ currency_code: 1, pay_id: 1, reject_reason_description: 1, status: 1 });
    if (customerPay.length === 0)
        res.status(404).json({ message: "No record found." });
    data.pay_ids = customerPay;
    res.status(200).json({ message: "The record has fetched successfully.", data: data });
});
const getUpiIdList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    let customerUpi = yield customer_upi_1.CustomerUpi.find({ currency_code: req.body.currency_code, customer: req.body._cid }).select({ currency_code: 1, upi_id: 1, reject_reason_description: 1, status: 1 });
    if (customerUpi.length === 0)
        res.status(404).json({ message: "No record found." });
    data.upi_ids = customerUpi;
    res.status(200).json({ message: "The record has fetched successfully.", data: data });
});
const editBank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateBank(req.body);
    if (error)
        throw error;
    let customerBank = yield customer_bank_1.CustomerBank.findOne({ _id: req.body._id, customer: req.body._cid });
    if (!customerBank)
        res.status(404).json({ message: "No record found." });
    let updatedbank = {
        _id: customerBank._id,
        customer: req.body._cid,
        account_ownership: req.body.account_ownership,
        currency_code: req.body.currency_code,
        bank_name: req.body.bank_name,
        account_no: req.body.account_no,
        account_name: req.body.account_name,
        bsb: req.body.bsb,
        routing_no: req.body.routing_no,
        transit_no: req.body.transit_no,
        ifsc_code: req.body.ifsc_code,
        pan_card_no: req.body.pan_card_no,
        pan_card_filename: req.body.pan_card_filename,
        sort_code: req.body.sort_code,
        iban: req.body.iban,
        bic: req.body.bic,
        id_type: req.body.id_type,
        id_front_filename: req.body.id_front_filename,
        id_back_filename: req.body.id_back_filename,
        created_at: customerBank.created_at,
        updated_at: new Date().toISOString()
    };
    yield customer_bank_1.CustomerBank.findOneAndRemove({ _id: req.body._id, customer: req.body._cid });
    updatedbank = new customer_bank_1.CustomerBank(updatedbank);
    updatedbank = updatedbank.save();
    res.status(200).json({ message: "The record has updated successfully." });
});
const editInteracId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateInterac(req.body);
    if (error)
        throw error;
    let customerInterac = yield customer_interac_1.CustomerInterac.findOne({ _id: req.body._id, customer: req.body._cid });
    if (!customerInterac)
        res.status(404).json({ message: "No record found." });
    customerInterac = lodash_1.default.assign(customerInterac, lodash_1.default.pick(req.body, ["interac_id", "currency_code"]));
    customerInterac.updated_at = new Date().toISOString();
    customerInterac = customerInterac.save();
    res.status(200).json({ message: "The record has updated successfully." });
});
const editPayId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validatePay(req.body);
    if (error)
        throw error;
    let customerPay = yield customer_pay_id_1.CustomerPayId.findOne({ _id: req.body._id, customer: req.body._cid });
    if (!customerPay)
        res.status(404).json({ message: "No record found." });
    customerPay = lodash_1.default.assign(customerPay, lodash_1.default.pick(req.body, ["pay_id", "currency_code"]));
    customerPay.updated_at = new Date().toISOString();
    customerPay = customerPay.save();
    res.status(200).json({ message: "The record has updated successfully." });
});
const editUpiId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateUpi(req.body);
    if (error)
        throw error;
    let customerUpi = yield customer_upi_1.CustomerUpi.findOne({ _id: req.body._id, customer: req.body._cid });
    if (!customerUpi)
        res.status(404).json({ message: "No record found." });
    customerUpi = lodash_1.default.assign(customerUpi, lodash_1.default.pick(req.body, ["upi_id", "currency_code"]));
    customerUpi.updated_at = new Date().toISOString();
    customerUpi = customerUpi.save();
    res.status(200).json({ message: "The record has updated successfully." });
});
const uploadProof = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.folderName = "bank";
    yield (0, upload_1.fileUpload)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(400).json({ message: err.message });
        if (!req.body.file)
            return res.status(400).json({ message: "Please Select the file." });
        res.status(200).json({
            message: "File uploaded successfully.",
            data: {
                file: req.body.file
            }
        });
    }));
});
const removeProof = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.folderName = "bank";
    if (!req.body.filename || req.body.filename === '')
        return res.status(400).json({ message: "File is not selected." });
    yield (0, upload_1.fileDelete)(req.body.filename, req.body.folderName);
    res.status(200).json({ message: "File deleted successfully." });
});
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateProfile(req.body);
    if (error)
        throw error;
    let customerProfile = yield customer_1.Customer.findOne({ _id: req.body._cid });
    if (!customerProfile)
        res.status(404).json({ message: "No record found." });
    customerProfile = lodash_1.default.assign(customerProfile, lodash_1.default.pick(req.body, ["fullname", "email_id", "country", "postal_code", "city", "state", "address"]));
    customerProfile.updated_at = new Date().toISOString();
    customerProfile = customerProfile.save();
    res.status(200).json({ message: "The record has updated successfully." });
});
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    let customerProfile = yield customer_1.Customer.findOne({ _id: req.body._cid })
        .populate("country", { country_name: 1, country_code: 1 })
        .select({ fullname: 1, email_id: 1, country: 1, postal_code: 1, city: 1, state: 1, address: 1 });
    let totalRecords = yield customer_1.Customer.find({}).countDocuments();
    data.profile = customerProfile;
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
});
const getCountryList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    let countryList = yield country_1.Country.find().select({ country_name: 1, country_code: 1 });
    let totalRecords = yield country_1.Country.find({}).countDocuments();
    data.countries = countryList;
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
});
exports.default = { checkPin, updatePin, addBank, addInteracID, addPayID, addUpiID, getBankList, getInteracIdList, getPayIdList, getUpiIdList, editBank, editInteracId, editPayId, editUpiId, uploadProof, removeProof, updateProfile, getProfile, getCountryList };
//# sourceMappingURL=settings.js.map