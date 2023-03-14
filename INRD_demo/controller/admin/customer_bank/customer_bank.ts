import { Request, Response } from "express";
import Joi from "joi";
import _ from "lodash";
import { CustomerBank } from '../../../models/customer_bank';

const validateBank = (data: Request) => {
    const schema = Joi.object({
        account_ownership: Joi.number().label('Account Ownership'),
        currency_code: Joi.string().label('Currency Code'),
        bank_name: Joi.string().label('Bank Name'),
        account_no: Joi.string().label('Account No'),
        account_name: Joi.string().label('Account Name'),
        bsb: Joi.alternatives().conditional('currency_code', {
            switch: [
                { is: "AUD", then: Joi.string() },
                { is: "SGD", then: Joi.string() },
                { is: "NZD", then: Joi.string() },
            ],
            otherwise: Joi.string().empty("")
        }).label("BSB"),
    	routing_no: Joi.alternatives().conditional('currency_code', { is: "USD", then: Joi.string(), otherwise: Joi.string().empty("") }).label('Rounting No'),
        transit_no: Joi.alternatives().conditional('currency_code', { is: "CAD", then: Joi.string(), otherwise: Joi.string().empty("") }).label('Transit No'),
        ifsc_code: Joi.alternatives().conditional('currency_code', { is: "INR", then: Joi.string(), otherwise: Joi.string().empty("") }).label('IFSC Code'),
        pan_card_no: Joi.alternatives().conditional('currency_code', { is: "INR", then: Joi.string(), otherwise: Joi.string().empty("") }).label('Pan Card No'),
        pan_card_filename: Joi.alternatives().conditional('currency_code', { is: "INR", then: Joi.string(), otherwise: Joi.string().empty("") }).label('Pan Card Filename'),
        sort_code: Joi.alternatives().conditional('currency_code', { is: "INR", then: Joi.string(), otherwise: Joi.string().empty("") }).label('Sort Code'),
        iban: Joi.alternatives().conditional('currency_code', { is: "EUR", then: Joi.string(), otherwise: Joi.string().empty("") }).label('IBAN'),
        bic: Joi.alternatives().conditional('currency_code', {
            switch: [
            { is: "EUR", then: Joi.string() },
            { is: "SGD", then: Joi.string() },
            ],
            otherwise: Joi.string().empty("")
        }).label('BIC'),
        id_type: Joi.alternatives().conditional('account_ownership', { is: 2,then: Joi.number(), otherwise: Joi.number().empty(0) }).label("ID Type"),
        id_front_filename: Joi.alternatives().conditional('account_ownership', { is: 2, then: Joi.string(), otherwise: Joi.string().empty("") }).label('ID Front Filename'),
        id_back_filename: Joi.alternatives().conditional('account_ownership', { is: 2, then: Joi.string(), otherwise: Joi.string().empty("") }).label('ID Back Filename'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateBankInfo = (data: Request) => {
    const schema = Joi.object({
        _id: Joi.string().required().label('Id'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const getBankList = async (req: Request, res: Response) => {
    const { error } = validateBank(req.body);
    if (error) throw error;

    let pageNo: number = req.body.page_no ? req.body.page_no : 1;
    let recordPerPage: number = req.body.record_per_page ? req.body.record_per_page : 5;
    let sortBy: string = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType: number = req.body.sort_type ? req.body.sort_type : -1;

    let allowSortBy: string[] = ["currency_code", "status", "transaction_type"];
    sortBy = allowSortBy.includes(sortBy) ? sortBy : "_id";

    let sort: any = {};
    sort[sortBy] = sortType;
    let skip: number = (pageNo - 1) * recordPerPage;
    let limit: number = recordPerPage;

    const saveFromDate = (value: any): string => {
        if (!value || value == '') return '';
        let date: any = new Date(value);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return new Date(date).toISOString();
    }
    const saveToDate = (value: any): string => {
        if (!value || value == '') return '';
        let newDate: any = new Date(value);
        newDate.setHours(23);
        newDate.setMinutes(59);
        newDate.setSeconds(59);
        newDate.setMilliseconds(999);
        return new Date(newDate).toISOString();
    }
    let filter: any = new Object();
    if (req.body.currency_code) filter["currency_code"] = new RegExp(req.body.currency_code, "i");
    if (req.body.transaction_type) filter["transaction_type"] = new RegExp(req.body.transaction_type, "i");
    if (req.body.hasOwnProperty('status') && req.body.status !== '') filter['status'] = req.body.status;
    if (req.body.from_date && req.body.from_date !== '') {
        let dateFrom = saveFromDate(req.body.from_date);
        filter['date'] = { '$gte': dateFrom }
    }
    if (req.body.to_date && req.body.to_date !== '') {
        let dateTo = saveToDate(req.body.to_date);
        filter['date'] = { '$lte': dateTo }
    }
      
    let result: any = {};
    if (pageNo == 1) {
        let totalRecords: number = await CustomerBank.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.data = await CustomerBank.find({ $and: [filter] }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json({ message: "The record has fetched successfully.",  data: result }); 
};

const getBankInfo = async (req: Request, res: Response) => {
    const { error } = validateBankInfo(req.body);
    if (error) throw error;

    let data: any = {};
    let customerBank: any = await CustomerBank.findOne({ _id: req.body._id });
    if (!customerBank) return res.status(404).json({ message: "No record found." });

    data.customerBank = _.assign(customerBank, _.pick(req.body, ["currency_code"])); 
    res.status(200).json({message: "The reacord has fetch successfully.", data: data});
}

export default { getBankList, getBankInfo }