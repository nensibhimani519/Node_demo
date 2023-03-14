import { Request, Response } from "express";
import Joi from "joi";
import _ from "lodash";
import { Specifications, typeArray, statusArray } from "../../../models/specifications";

const validate = (data: Request) => {
    const schema = Joi.object({
        type: Joi.number().required().label('Type'),
        name: Joi.string().required().max(50).label('Name'),
        is_variant: Joi.number().empty(0).label('Is Variant'),
        options: Joi.array().when("is_variant", {
            is: 1,
            then: Joi.array().items(Joi.object({
                name: Joi.string().required().max(50),
                code: Joi.string().required().max(3).regex(/^[-A-Z0-9\._]*$/),
                color_code: Joi.string().empty("").max(7),
            })),
            otherwise: Joi.array().items(Joi.object({
                name: Joi.string().required().max(50),
                code: Joi.string().empty("").max(3).regex(/^[-A-Z0-9\._]*$/),
                color_code: Joi.string().empty("").max(7),
            }))
        }
      ).required().label('Options'),              
  });
  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const specificationView = async (specification: any) => {
    specification = _.pick(specification, ["_id", "name", "type", "is_variant", "options", "status" ])

    specification.type = { _id: specification.type, name: typeArray[specification.type] };
    specification.status = { _id: specification.status, name: statusArray[specification.status] };
    
    return specification;
};

const specificationStatusView = async (specification: any) => {
    specification = _.pick(specification, ["_id", "status" ])
    specification.status = { _id: specification.status, name: statusArray[specification.status] };
    
    return specification;
};

const index = async (req: Request, res: Response) => {
    let skipNumber: number = req.body.skip_number ? req.body.skip_number : 1;
    let recordPerPage: number = req.body.record_per_page ? req.body.record_per_page : 5;
    let sortBy: string = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType: number = req.body.sort_type ? req.body.sort_type : -1;

    let allowSortBy: string[] = ["name", "type", "is_variant", "status"];
    sortBy = allowSortBy.includes(sortBy) ? sortBy : "_id";

    let sort: any = {};
    sort[sortBy] = sortType;
    let skip: number = skipNumber;
    let limit: number = recordPerPage;

   
    let filter: any = new Object();
    if (req.body.name) filter["name"] = new RegExp(req.body.name, "i");
    if (req.body.hasOwnProperty('status') && req.body.status !== '') filter['status'] = req.body.status;
      
    let result: any = {};
    if (skipNumber == 1) {
        let totalRecords: number = await Specifications .find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;

        let master: any = {};
        master.status = statusArray
        result.master = master;
    }

    result.data = await Specifications.find({ $and: [filter] }).select({ name: 1, type: 1, is_variant: 1, status: 1 }).sort(sort).skip(skip).limit(limit).lean();
     result.data = result.data.map((el: any) => {
        el.type = { _id: el.type, name: typeArray[el.type] };
        el.status = { _id: el.status, name: statusArray[el.status] };
        return el;
     });
    
    res.status(200).json(result);   
};  

const add = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) throw error;
  
    let specification: any = new Specifications(_.pick(req.body, ["name", "type", "is_variant", "options", "status" ]));

    specification = await specification.save();
    specification = await specificationView(specification);  
    specification = specification;
  
    res.status(200).json({ message: "The record has saved successfully.", data: specification });
};

const view = async (req: Request, res: Response) => {
    let dataRequest = (req.body && req.body._id) ? true : false;
    let masterRequest: boolean = (req.body.master_request && req.body.master_request === 1) ? true : false;
    let specification: any = {};

    if (dataRequest) {      
        let data: any = await Specifications.findOne({ _id: req.body._id });
        if (!data) return res.status(404).json({ message: "No record found." });
        specification.data = await specificationView(data);
    };
    
    if (masterRequest) {
        specification.master = {};
        specification.master.type = typeArray;
    };
    
    res.status(200).json(specification);
};

const edit = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) throw error;
  
    let specification: any = await Specifications.findOne({ _id: req.body._id });
    if (!specification) res.status(404).json({ message: "No record found." });
  
    specification = _.assign(specification, _.pick(req.body, ["name", "type", "is_variant", "options", "status" ]));
    specification = await specification.save();
    specification = await specificationView(specification);
  
    res.status(200).json({ message: "The record has updated successfully.", data: specification });
};

const remove = async (req: Request, res: Response) => {
    let specification: any = await Specifications.findOneAndRemove({ _id: req.body._id });
    if (!specification) return res.status(404).json({ message: "No recored found." });
  
    res.status(200).json({ message: "The record has deleted successfully." });
};

const status = async (req: Request, res: Response) => {
    let specification: any = await Specifications.findOne({ _id: req.body._id });
    if (!specification) return res.status(404).json({ message: "No recored found." });

    specification.status = !specification.status;
    specification = await specification.save();
    specification = await specificationStatusView(specification);

    res.status(200).json({ message: "The status has changed successfully.", data: specification });
};
  
export default { index, add, view, edit, remove, status }