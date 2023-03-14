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
const joi_1 = __importDefault(require("joi"));
const notification_1 = require("../../../models/notification");
const validateAnnouncement = (data) => {
    const schema = joi_1.default.object({
        app_install_date_time: joi_1.default.date().required().label('App Install DateTime'),
        page_no: joi_1.default.number().required().label('Page No'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const validateUnreadCount = (data) => {
    const schema = joi_1.default.object({
        notification_last_open_date_time: joi_1.default.date().required().label('Notification last open DateTime'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const getAnnouncementList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateAnnouncement(req.body);
    if (error)
        throw error;
    let data = {};
    let announcementList = yield notification_1.Notification.find({ app_install_date_time: req.body.app_install_date_time, page_no: req.body.page_no, _id: req.body._cid });
    let totalRecords = yield notification_1.Notification.find({}).countDocuments();
    data.announcement = announcementList;
    res.status(200).json({ message: "The record has fetched successfully.", totalRecords: totalRecords, data: data });
});
const getUnreadCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validateUnreadCount(req.body);
    if (error)
        throw error;
    let data = {};
    let unreadCountList = yield notification_1.Notification.find({});
    let unread_count = yield notification_1.Notification.find({}).countDocuments();
    data.announcement = unreadCountList;
    res.status(200).json({ message: "The record has fetched successfully.", unread_count: unread_count, data: data });
});
exports.default = { getAnnouncementList, getUnreadCount };
//# sourceMappingURL=notification.js.map