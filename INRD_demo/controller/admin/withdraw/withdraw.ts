import { Request, Response } from "express";
import Joi from "joi";
import _ from "lodash";
import { WithdrawRequest } from '../../../models/withdraw_request'

const validate = (data: Request) => {
    const schema = Joi.object({
        status: Joi.number().empty(1).label('Status'),
    	currency_code: Joi.string().empty("").label('Currency Code'),
        from_date: Joi.date().label('From Date'),
        to_date: Joi.date().label('To Date'),
        transaction_type: Joi.number().empty(1).label('Transaction Type'),
        page_no: Joi.number().empty(1).label('Page No'),
        record_per_page: Joi.number().empty(1).label('Record Per Page'),
        sort_by: Joi.string().empty("").label('Sort By'),
        sort_type: Joi.string().empty("").label('Sort Type'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateWithdrawInfo = (data: Request) => {
    const schema = Joi.object({
        _id: Joi.string().required().label('Id'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const getWithdrawRequestList = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
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
        let totalRecords: number = await WithdrawRequest.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.data = await WithdrawRequest.find({ $and: [filter] }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json({ message: "The record has fetched successfully.",  data: result }); 
};

const getWithdrawRequestInfo = async (req: Request, res: Response) => {
    const { error } = validateWithdrawInfo(req.body);
    if (error) throw error;

    let data: any = {};
    let withdraw: any = await WithdrawRequest.findOne({ _id: req.body._id });
    if (!withdraw) return res.status(404).json({ message: "No record found." });

    data.withdraw = _.assign(withdraw, _.pick(req.body, ["currency_code"]));
    res.status(200).json({ message: "The reacord has fetch successfully.", data: data });
};

const approveWithdrawRequest = async (req: Request, res: Response) => {
    const { error } = validateWithdrawInfo(req.body);
    if (error) throw error;

    let withdraw: any = await WithdrawRequest.findOne({ _id: req.body._id });
    if (!withdraw) return res.status(404).json({ message: "No recored found." });
  
    withdraw.status = 2;
    withdraw.updated_on = new Date().toISOString();
    withdraw = withdraw.save();

    res.status(200).json({ message: "The reacord has withdraw request approved successfully." });
};

const rejectWithdrawRequest = async (req: Request, res: Response) => {
    const { error } = validateWithdrawInfo(req.body);
    if (error) throw error;

    let withdraw: any = await WithdrawRequest.findOne({ _id: req.body._id });
    if (!withdraw) return res.status(404).json({ message: "No recored found." });
  
    withdraw.status = 3;
    withdraw.updated_on = new Date().toISOString();
    withdraw = withdraw.save();

    res.status(200).json({ message: "The record has rejected withdraw request." });
};

export default { getWithdrawRequestList, getWithdrawRequestInfo, approveWithdrawRequest, rejectWithdrawRequest }