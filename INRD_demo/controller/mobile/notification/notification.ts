import { Request, Response } from "express";
import _ from "lodash";
import Joi from "joi";
import { Notification } from "../../../models/notification";

const validateAnnouncement = (data: Request) => {
    const schema = Joi.object({
        app_install_date_time: Joi.date().required().label('App Install DateTime'),
        page_no: Joi.number().required().label('Page No'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateUnreadCount = (data: Request) => {
    const schema = Joi.object({
        notification_last_open_date_time: Joi.date().required().label('Notification last open DateTime'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const getAnnouncementList = async (req: Request, res: Response) => {
    const { error } = validateAnnouncement(req.body);
    if (error) throw error;

    let data: any = {};
    let announcementList: any = await Notification.find({app_install_date_time: req.body.app_install_date_time, page_no: req.body.page_no, _id: req.body._cid});
    let totalRecords: any = await Notification.find({}).countDocuments();

    data.announcement = announcementList
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
};

const getUnreadCount = async (req: Request, res: Response) => {
    const { error } = validateUnreadCount(req.body);
    if (error) throw error;

    let data: any = {};
    let unreadCountList: any = await Notification.find({});
    let unread_count: any = await Notification.find({}).countDocuments();

    data.announcement = unreadCountList
    res.status(200).json({ message: "The record has fetched successfully.", unread_count: unread_count, data: data });
};

export default { getAnnouncementList, getUnreadCount}