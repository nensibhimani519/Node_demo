import { Request, Response } from "express";
import Joi from "joi";
import _ from "lodash";
import { Announcement } from '../../../models/announcement'

const announcementView = async (announcement: any) => {
    announcement = _.pick(announcement, [
      "_id",
      "currency_code",
      "description",
      "created_on",
      "updated_on",
    ]);
    return announcement;
};

const validate = (data: Request) => {
    const schema = Joi.object({
        status: Joi.number().empty(1).label('Status'),
    	currency_code: Joi.string().empty("").label('Currency Code'),
        from_date: Joi.date().label('From Date'),
        to_date: Joi.date().label('To Date'),
        page_no: Joi.number().empty(1).label('Page No'),
        record_per_page: Joi.number().empty(1).label('Record Per Page'),
        sort_by: Joi.string().empty("").label('Sort By'),
        sort_type: Joi.string().empty("").label('Sort Type'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateAnnouncementInfo = (data: Request) => {
    const schema = Joi.object({
        _id: Joi.string().required().label('Id'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateAddAnnouncement = (data: Request) => {
    const schema = Joi.object({
        description: Joi.string().required().label('Description'),
        currency_code: Joi.string().empty("").label('Currency Code'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateUpdateAnnouncement = (data: Request) => {
    const schema = Joi.object({
        _id: Joi.string().required().label('Id'),
        description: Joi.string().required().label('Description'),
        currency_code: Joi.string().empty("").label('Currency Code'),
        status: Joi.number().empty(1).label('Currency Code'),
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

const getAnnouncementList = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) throw error;

    let pageNo: number = req.body.page_no ? req.body.page_no : 1;
    let recordPerPage: number = req.body.record_per_page ? req.body.record_per_page : 5;
    let sortBy: string = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType: number = req.body.sort_type ? req.body.sort_type : -1;

    let allowSortBy: string[] = ["currency_code", "status"];
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
    if (req.body.hasOwnProperty('status') && req.body.status !== '') filter['status'] = req.body.status;
    if (req.body.from_date && req.body.from_date !== '' ) {
        let dateFrom = saveFromDate(req.body.from_date);
        filter['created_at'] = { '$gte': dateFrom }
    }
    if (req.body.to_date && req.body.to_date !== '') {
        let dateTo = saveToDate(req.body.to_date);
        filter['created_at'] = { '$lte': dateTo }
    }
      console.log(filter,'filter');
      
    let result: any = {};
    if (pageNo == 1) {
        let totalRecords: number = await Announcement.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.data = await Announcement.find({ $and: [filter] }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json({ message: "The record has fetched successfully.",  data: result });   
};

const getAnnouncementInfo = async (req: Request, res: Response) => {
    const { error } = validateAnnouncementInfo(req.body);
    if (error) throw error;

    let data: any = {};
    let announcement: any = await Announcement.findOne({ _id: req.body._id });
    if (!announcement) return res.status(404).json({ message: "No record found." });

    data.announcement = await announcementView(announcement);  
    res.status(200).json({message: "The reacord has fetch successfully.", data: data});
}

const addAnnouncement = async (req: Request, res: Response) => {
    const { error } = validateAddAnnouncement(req.body);
    if (error) throw error;

    let announcement: any = new Announcement(_.pick(req.body, ["currency_code", "description"]));
    announcement = await announcement.save();

    res.status(200).json({ message: "The record has saved successfully." });
}

const updateAnnouncement = async (req: Request, res: Response) => {
    const { error } = validateUpdateAnnouncement(req.body);
    if (error) throw error;

    let announcement: any = await Announcement.findOne({_id: req.body._id});
    if (!announcement) res.status(404).json({ message: "No record found." });

    announcement = _.assign(announcement, _.pick(req.body, ["currency_code", "status", "description"]));
    announcement.updated_at = new Date().toISOString();
    announcement = announcement.save();

    res.status(200).json({ message: "The record has updated successfully." });
}

const changeStatus = async (req: Request, res: Response) => {
    const { error } = validatestatus(req.body);
    if (error) throw error;

    let announcement: any = await Announcement.findOne({ _id: req.body._id });
    if (!announcement) return res.status(404).json({ message: "No recored found." });
  
    announcement.status = !announcement.status;
    announcement.updated_on = new Date().toISOString();
    announcement = announcement.save();
  
    res.status(200).json({ message: "The status has changed successfully." });
}

const deleteAnnouncement = async (req: Request, res: Response) => {
    const { error } = validateAnnouncementInfo(req.body);
    if (error) throw error;

    let announcement: any = await Announcement.findOneAndRemove({ _id: req.body._id });
  if (!announcement) return res.status(404).json({ message: "No recored found." });

  res.status(200).json({ message: "The record has deleted successfully." });
}

export default { getAnnouncementList, getAnnouncementInfo, addAnnouncement, updateAnnouncement, changeStatus, deleteAnnouncement }