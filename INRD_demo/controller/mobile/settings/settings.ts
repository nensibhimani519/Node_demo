import { Request, Response } from "express";
import _ from "lodash";
import Joi from "joi";
import { CustomerBank } from "../../../models/customer_bank";
import { Customer } from "../../../models/customer";
import { CustomerInterac } from "../../../models/customer_interac";
import { CustomerPayId } from "../../../models/customer_pay_id";
import { CustomerUpi } from "../../../models/customer_upi";
import { Country } from "../../../models/country";
import { fileDelete, fileUpload } from '../../../helper/upload';

const validate = (data: Request) => {
    const schema = Joi.object({
        pin: Joi.string().required().label('Pin'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateUpdatePin = (data: Request) => {
    const schema = Joi.object({
        old_pin: Joi.string().required().label('Old Pin'),
        new_pin: Joi.string().required().label('New Pin'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateBank = (data: Request) => {
    const schema = Joi.object({
        account_ownership: Joi.number().required().label('Account Ownership'),
        currency_code: Joi.string().required().label('Currency Code'),
        bank_name: Joi.string().required().label('Bank Name'),
        account_no: Joi.string().required().label('Account No'),
        account_name: Joi.string().required().label('Account Name'),
        bsb: Joi.alternatives().conditional('currency_code', {
            switch: [
                { is: "AUD", then: Joi.string().required() },
                { is: "SGD", then: Joi.string().required() },
                { is: "NZD", then: Joi.string().required() },
            ],
            otherwise: Joi.string().empty("")
        }).label("BSB"),
    	routing_no: Joi.alternatives().conditional('currency_code', { is: "USD", then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('Rounting No'),
        transit_no: Joi.alternatives().conditional('currency_code', { is: "CAD", then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('Transit No'),
        ifsc_code: Joi.alternatives().conditional('currency_code', { is: "INR", then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('IFSC Code'),
        pan_card_no: Joi.alternatives().conditional('currency_code', { is: "INR", then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('Pan Card No'),
        pan_card_filename: Joi.alternatives().conditional('currency_code', { is: "INR", then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('Pan Card Filename'),
        sort_code: Joi.alternatives().conditional('currency_code', { is: "INR", then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('Sort Code'),
        iban: Joi.alternatives().conditional('currency_code', { is: "EUR", then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('IBAN'),
        bic: Joi.alternatives().conditional('currency_code', {
            switch: [
            { is: "EUR", then: Joi.string().required() },
            { is: "SGD", then: Joi.string().required() },
            ],
            otherwise: Joi.string().empty("")
        }).label('BIC'),
        id_type: Joi.alternatives().conditional('account_ownership', { is: 2,then: Joi.number().required(), otherwise: Joi.number().empty(0) }).label("ID Type"),
        id_front_filename: Joi.alternatives().conditional('account_ownership', { is: 2, then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('ID Front Filename'),
        id_back_filename: Joi.alternatives().conditional('account_ownership', { is: 2, then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('ID Back Filename'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateInterac = (data: Request) => {
    const schema = Joi.object({
        currency_code: Joi.string().required().valid("CAD").label('Currency Code'),
        interac_id: Joi.string().required().label('Interac ID'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validatePay = (data: Request) => {
    const schema = Joi.object({
        currency_code: Joi.string().required().valid("AUD").label('Currency Code'),
        pay_id: Joi.string().required().label('Pay ID'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateUpi = (data: Request) => {
    const schema = Joi.object({
        currency_code: Joi.string().required().valid("INR").label('Currency Code'),
        upi_id: Joi.string().required().label('Upi ID'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateProfile = (data: Request) => {
    const schema = Joi.object({
        country: Joi.string().required().label('Country'),
        fullname: Joi.string().empty('').label('Full Name'),
        email_id: Joi.string().empty('').label('Email'),
        Postal_code: Joi.string().empty('').label('Postal Code'),
        city: Joi.string().empty('').label('City'),
        state: Joi.string().empty('').label('State'),
        address: Joi.string().empty('').label('Address'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const checkPin = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) throw error;

    let customer: any = await Customer.findOne({ mpin: req.body.pin, _id: req.body._cid });
    if (!customer) res.status(404).json({ message: "You entered wrong pin. Please try again!" });

    res.status(200).json({ message: "Pin matched." });
};

const updatePin = async (req: Request, res: Response) => {
    const { error } = validateUpdatePin(req.body);
    if (error) throw error;

    let customer: any = await Customer.findOne({ mpin: req.body.old_pin, _id: req.body._cid });
    if (!customer) res.status(404).json({ message: "You entered wrong pin. Please try again!" });

    customer.mpin = req.body.new_pin;
    customer = customer.save();

    res.status(200).json({ message: "Pin updated successfully." });
} 

const addBank = async (req: Request, res: Response) => {
    const { error } = validateBank(req.body);
    if (error) throw error;

    let customerBank: any = new CustomerBank(_.pick(req.body, ["account_ownership", "currency_code", "bank_name", "account_no", "account_name", "bsb", "routing_no", "transit_no", "ifsc_code", "pan_card_no", "pan_card_filename", "sort_code", "iban", "bic", "id_type", "id_front_filename", "id_back_filename"]));

    customerBank.customer = req.body._cid;
    customerBank = await customerBank.save();
    res.status(200).json({ message: "The record has saved successfully." });
};

const addInteracID = async (req: Request, res: Response) => {
    const { error } = validateInterac(req.body);
    if (error) throw error;

    let customerInterac: any = new CustomerInterac(_.pick(req.body, ["interac_id", "currency_code"]));
    customerInterac.customer = req.body._cid;
    customerInterac = customerInterac.save();

    res.status(200).json({ message: "The record has saved successfully." });
};

const addPayID = async (req: Request, res: Response) => {
    const { error } = validatePay(req.body);
    if (error) throw error;

    let customerPay: any = new CustomerPayId(_.pick(req.body, ["pay_id", "currency_code"]));
    customerPay.customer = req.body._cid;
    customerPay = customerPay.save();

    res.status(200).json({ message: "The record has saved successfully." });
};

const addUpiID = async (req: Request, res: Response) => {
    const { error } = validateUpi(req.body);
    if (error) throw error;

    let customerUpi: any = new CustomerUpi(_.pick(req.body, ["upi_id", "currency_code"]));
    customerUpi.customer = req.body._cid;
    customerUpi = customerUpi.save();

    res.status(200).json({ message: "The record has saved successfully." });
};

const getBankList = async (req: Request, res: Response) => {
    let banks: any = await CustomerBank.find({ currency_code: req.body.currency_code, customer: req.body._cid });
    if (banks.length === 0) res.status(404).json({ message: "No record found." });
    
    res.status(200).json({ message: "The record has fetched successfully.", data: banks });
};

const getInteracIdList = async (req: Request, res: Response) => {
    let data: any = {};
    let customerInterac: any = await CustomerInterac.find({ currency_code: req.body.currency_code, customer: req.body._cid }).select({ currency_code: 1, interac_id: 1, reject_reason_description: 1, status: 1 });
    if (customerInterac.length === 0) res.status(404).json({ message: "No record found." });
    data.interac_ids = customerInterac;
    
    res.status(200).json({ message: "The record has fetched successfully.", data: data });
};

const getPayIdList = async (req: Request, res: Response) => {
    let data: any = {};
    let customerPay: any = await CustomerPayId.find({ currency_code: req.body.currency_code, customer: req.body._cid }).select({ currency_code: 1, pay_id: 1, reject_reason_description: 1, status: 1 });
    if (customerPay.length === 0) res.status(404).json({ message: "No record found." });
    data.pay_ids = customerPay;
    
    res.status(200).json({ message: "The record has fetched successfully.", data: data });
};

const getUpiIdList = async (req: Request, res: Response) => {
    let data: any = {};
    let customerUpi: any = await CustomerUpi.find({ currency_code: req.body.currency_code, customer: req.body._cid }).select({ currency_code: 1, upi_id: 1, reject_reason_description: 1, status: 1 });
    if (customerUpi.length === 0) res.status(404).json({ message: "No record found." });
    data.upi_ids = customerUpi;
    
    res.status(200).json({ message: "The record has fetched successfully.", data: data });
};

const editBank = async (req: Request, res: Response) => {
    const { error } = validateBank(req.body);
    if (error) throw error;

    let customerBank: any = await CustomerBank.findOne({ _id: req.body._id, customer: req.body._cid });
    if (!customerBank) res.status(404).json({ message: "No record found." });

    let updatedbank: any = {
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
    
    await CustomerBank.findOneAndRemove({ _id: req.body._id, customer: req.body._cid });
    updatedbank = new CustomerBank(updatedbank);
    updatedbank = updatedbank.save();

    res.status(200).json({ message: "The record has updated successfully." });
};

const editInteracId = async (req: Request, res: Response) => {
    const { error } = validateInterac(req.body);
    if (error) throw error;

    let customerInterac: any = await CustomerInterac.findOne({ _id: req.body._id, customer: req.body._cid });
    if (!customerInterac) res.status(404).json({ message: "No record found." });

    customerInterac = _.assign(customerInterac, _.pick(req.body, ["interac_id", "currency_code"]));
    customerInterac.updated_at = new Date().toISOString();
    customerInterac = customerInterac.save();

    res.status(200).json({ message: "The record has updated successfully." })
};

const editPayId = async (req: Request, res: Response) => {
    const { error } = validatePay(req.body);
    if (error) throw error;

    let customerPay: any = await CustomerPayId.findOne({ _id: req.body._id, customer: req.body._cid });
    if (!customerPay) res.status(404).json({ message: "No record found." });

    customerPay = _.assign(customerPay, _.pick(req.body, ["pay_id", "currency_code"]));
    customerPay.updated_at = new Date().toISOString();
    customerPay = customerPay.save();

    res.status(200).json({message: "The record has updated successfully."})
}

const editUpiId = async (req: Request, res: Response) => {
    const { error } = validateUpi(req.body);
    if (error) throw error;

    let customerUpi: any = await CustomerUpi.findOne({ _id: req.body._id, customer: req.body._cid });
    if (!customerUpi) res.status(404).json({ message: "No record found." });

    customerUpi = _.assign(customerUpi, _.pick(req.body, ["upi_id", "currency_code"]));
    customerUpi.updated_at = new Date().toISOString();
    customerUpi = customerUpi.save();

    res.status(200).json({ message: "The record has updated successfully." })
};

const uploadProof = async (req: Request, res: Response) => {
    req.body.folderName = "bank";
    await fileUpload(req, res, async (err: any) => {
        if (err) return res.status(400).json({ message: err.message });

        if (!req.body.file) return res.status(400).json({ message: "Please Select the file." });

        res.status(200).json({
            message: "File uploaded successfully.",
            data: {
                file: req.body.file
            }
        });
    })
};

const removeProof = async (req: Request, res: Response) => {
    req.body.folderName = "bank";
    if (!req.body.filename || req.body.filename === '') return res.status(400).json({ message: "File is not selected." });

    await fileDelete(req.body.filename, req.body.folderName);
    res.status(200).json({ message: "File deleted successfully." });
};

const updateProfile = async (req: Request, res: Response) => {
    const { error } = validateProfile(req.body);
    if (error) throw error;

    let customerProfile: any = await Customer.findOne({_id: req.body._cid});
    if (!customerProfile) res.status(404).json({ message: "No record found." });

    customerProfile = _.assign(customerProfile, _.pick(req.body, ["fullname", "email_id", "country", "postal_code", "city", "state", "address"]));
    customerProfile.updated_at = new Date().toISOString();
    customerProfile = customerProfile.save();

    res.status(200).json({ message: "The record has updated successfully." });
};

const getProfile = async (req: Request, res: Response) => {
    let data: any = {};
    let customerProfile: any = await Customer.findOne({ _id: req.body._cid })
        .populate("country", { country_name: 1, country_code: 1})
        .select({ fullname: 1, email_id: 1, country: 1, postal_code: 1, city: 1, state: 1, address: 1 });
    let totalRecords: any = await Customer.find({}).countDocuments();

    data.profile = customerProfile
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
};

const getCountryList = async (req: Request, res: Response) => {
    let data: any = {};
    let countryList: any = await Country.find().select({country_name: 1, country_code: 1});
    let totalRecords: any = await Country.find({}).countDocuments();

    data.countries = countryList
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
};

export default { checkPin, updatePin, addBank, addInteracID, addPayID, addUpiID, getBankList, getInteracIdList, getPayIdList, getUpiIdList, editBank, editInteracId, editPayId, editUpiId, uploadProof, removeProof, updateProfile, getProfile, getCountryList }