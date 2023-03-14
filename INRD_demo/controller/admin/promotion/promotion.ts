import { Request, Response } from "express";
import Joi from "joi";
import _ from "lodash";
import { Promotion } from '../../../models/promotion'

const validate = (data: Request) => {
    const schema = Joi.object({
        _id: Joi.string().required().label('Id'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateAddPromotion = (data: Request) => {
    const schema = Joi.object({
        img: Joi.string().required().label('Image'),
        active_from: Joi.date().required().label('Active From'),
        active_to: Joi.date().required().label('Active To'),
        frequency: Joi.number().required().label('Frequency'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateUpdatePromotion = (data: Request) => {
    const schema = Joi.object({
        _id: Joi.string().required().label('Id'),
        img: Joi.string().required().label('Image'),
        active_from: Joi.date().required().label('Active From'),
        active_to: Joi.date().required().label('Active To'),
        frequency: Joi.number().required().label('Frequency'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validatestatus = (data: Request) => {
    const schema = Joi.object({
        _id: Joi.string().required().label('Id'),
        status: Joi.number().required().label('Status'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const getPromotionList = async (req: Request, res: Response) => {
    let pageNo: number = req.body.page_no ? req.body.page_no : 1;
    let recordPerPage: number = req.body.record_per_page ? req.body.record_per_page : 10;
    let sortBy: string = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType: number = req.body.sort_type ? req.body.sort_type : -1;

    let allowSortBy: string[] = ["status","frequency"];
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
    if (req.body.hasOwnProperty('status') && req.body.status !== '') filter['status'] = req.body.status;
    if (req.body.hasOwnProperty('frequency') && req.body.frequency !== '') filter['frequency'] = req.body.frequency;
    if (req.body.active_from && req.body.active_from !== '') {
        let activeFrom = saveFromDate(req.body.active_from);
        filter['date'] = { '$gte': activeFrom }
    }
    if (req.body.active_to && req.body.active_to !== '') {
        let activeTo = saveToDate(req.body.active_to);
        filter['date'] = { '$lte': activeTo }
    }

    let result: any = {};
    if (pageNo == 1) {
        let totalRecords: number = await Promotion.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.data = await Promotion.find({ $and: [filter] }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json({ message: "The record has fetched successfully.",  data: result }); 
};

const getPromotionInfo = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) throw error;

    let data: any = {};
    let promotion: any = await Promotion.findOne({ _id: req.body._id });
    if (!promotion) return res.status(404).json({ message: "No record found." });

    data.promotion = _.assign(promotion, _.pick(req.body, ["img", "active_from", "active_to", "frequency"]));
    res.status(200).json({ message: "The reacord has fetch successfully.", data: data });
};

const addPromotion = async (req: Request, res: Response) => {
    const { error } = validateAddPromotion(req.body);
    if (error) throw error;

    let promotion: any = new Promotion(_.pick(req.body, ["img", "active_from", "active_to", "frequency"]));
    promotion = promotion.save();

    res.status(200).json({ message: "The record has saved successfully." });
};

const updatePromotion = async (req: Request, res: Response) => {
    const { error } = validateUpdatePromotion(req.body);
    if (error) throw error;

    let promotion: any = await Promotion.findOne({ _id: req.body._id });
    if (!promotion) res.status(404).json({ message: "No record found." });

    promotion = _.assign(promotion, _.pick(req.body, ["img", "active_from", "active_to", "frequency"]));
    promotion.updated_at = new Date().toISOString();
    promotion = promotion.save();

    res.status(200).json({ message: "The record has updated successfully." });
};

const changeStatus = async (req: Request, res: Response) => {
    const { error } = validatestatus(req.body);
    if (error) throw error;

    let promotion: any = await Promotion.findOne({ _id: req.body._id });
    if (!promotion) return res.status(404).json({ message: "No recored found." });
  
    promotion.status = !promotion.status;
    promotion.updated_on = new Date().toISOString();
    promotion = promotion.save();
  
    res.status(200).json({ message: "The status has changed successfully." });
};

const deletePromotion = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) throw error;

    let promotion: any = await Promotion.findOneAndRemove({ _id: req.body._id });
    if (!promotion) return res.status(404).json({ message: "No recored found." });

    res.status(200).json({ message: "The record has deleted successfully." });
};

export default { getPromotionList, getPromotionInfo, addPromotion, updatePromotion, changeStatus, deletePromotion}