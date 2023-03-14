import { Request, Response } from "express";
import Joi from "joi";
import _ from "lodash";
import { CustomerInterac } from '../../../models/customer_interac'

const validate = (data: Request) => {
    const schema = Joi.object({
        _id: Joi.string().required().label('Id'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const getInteracIdList = async (req: Request, res: Response) => {
    let pageNo: number = req.body.page_no ? req.body.page_no : 1;
    let recordPerPage: number = req.body.record_per_page ? req.body.record_per_page : 10;
    let sortBy: string = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType: number = req.body.sort_type ? req.body.sort_type : -1;

    let allowSortBy: string[] = ["currency_code", "status"];
    sortBy = allowSortBy.includes(sortBy) ? sortBy : "_id";

    let sort: any = {};
    sort[sortBy] = sortType;
    let skip: number = (pageNo - 1) * recordPerPage;
    let limit: number = recordPerPage;
   
    let filter: any = new Object();
    if (req.body.currency_code) filter["currency_code"] = new RegExp(req.body.currency_code, "i");
    if (req.body.hasOwnProperty('status') && req.body.status !== '') filter['status'] = req.body.status;
    
    let result: any = {};
    if (pageNo == 1) {
        let totalRecords: number = await CustomerInterac.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.interac_id = await CustomerInterac.find({ $and: [filter] }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json({ message: "The record has fetched successfully.",  data: result }); 
};

const getInteracIdInfo = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) throw error;

    let data: any = {};
    let customerInteracId: any = await CustomerInterac.findOne({ _id: req.body._id });
    if (!customerInteracId) return res.status(404).json({ message: "No record found." });

    data.interac_id= _.assign(customerInteracId, _.pick(req.body, ["currency_code"])); 
    res.status(200).json({message: "The reacord has fetch successfully.", data: data});
}

export default { getInteracIdList, getInteracIdInfo }