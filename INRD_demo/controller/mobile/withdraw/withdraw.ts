import { Request, Response } from "express";
import _ from "lodash";
import Joi from "joi";
import { Currency } from "../../../models/currency";
import { WithdrawRequest } from "../../../models/withdraw_request";

const validateWithdrawRequest = (data: Request) => {
    const schema = Joi.object({
        currency_code: Joi.string().required().label('Currency Code'),
        amount: Joi.number().required().label('Amount'),
        transaction_type: Joi.number().required().label('Transaction Type'),
        bank: Joi.alternatives().conditional('transaction_type', { is: 1, then: Joi.string().required(), otherwise: Joi.string().empty("") }).label('Bank'),
        upi_id: Joi.alternatives().conditional('transaction_type', { is: 2, then: Joi.string().hex().length(24).required(), otherwise: Joi.string().empty("") }).label('Upi ID'),
        pay_id: Joi.alternatives().conditional('transaction_type', { is: 3, then: Joi.string().hex().length(24).required(), otherwise: Joi.string().empty("") }).label('Pay ID'),
        interac_id: Joi.alternatives().conditional('transaction_type', { is: 4, then: Joi.string().hex().length(24).required(), otherwise: Joi.string().empty("") }).label('Interac ID'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const getCurrencyList = async (req: Request, res: Response) => {
    let data: any = {};
    let currencyList: any = await Currency.find().select({currency_code: 1});
    let totalRecords: any = await Currency.find({}).countDocuments();

    data.currency = currencyList
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
};

const addWithdrawRequest = async (req: Request, res: Response) => {
    const { error } = validateWithdrawRequest(req.body);
    if (error) throw error;

    let withdrawRequest: any = new WithdrawRequest(_.pick(req.body, ["currency_code", "amount", "transaction_type", "bank", "upi_id", "pay_id", "interac_id"]));
    withdrawRequest.customer = req.body._cid;
    withdrawRequest = withdrawRequest.save();

    res.status(200).json({ message: "The record has saved successfully." });
};

const getWithdrawRequestList = async (req: Request, res: Response) => {
    let data: any = {};
    let withdrawRequestList: any = await WithdrawRequest.find({ customer: req.body._cid, currency_code: req.body.currency_code })
        .populate("bank", {account_ownership: 1, currency_code: 1, bank_name: 1, accpunt_no: 1, account_name: 1, bsb_no: 1, routing_no: 1, transit_no: 1, ifsc_code: 1, pan_card_no: 1, pan_card_filename: 1, sort_code: 1, iban: 1, bic: 1 })
        .populate("pay_id", { pay_id: 1 })
        .populate("upi_id", {upi_id: 1})
        .populate("interac_id", {interac_id: 1})
        .select({ request_date_time: 1, amount: 1, bank: 1, pay_id: 1, upi_id: 1, interac_id: 1, currency_code: 1, transaction_type: 1, status: 1 });

    let totalRecords: any = await WithdrawRequest.find({customer: req.body._cid, currency_code: req.body.currency_code}).countDocuments();
    
    data.withdraw_request = withdrawRequestList
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
};

export default { getCurrencyList, addWithdrawRequest, getWithdrawRequestList}