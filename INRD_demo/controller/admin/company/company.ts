import { Request, Response } from "express";
import Joi from "joi";
import _ from "lodash";
import { Company } from '../../../models/company'

const validate = (data: Request) => {
    const schema = Joi.object({
        _id: Joi.string().required().label("Id"),
        help: Joi.object({           
            twitter_link: Joi.string().empty("").label('Twitter Link'),
            whatsapp_link: Joi.string().empty("").label('Whatsapp Link'),
            discord_link: Joi.string().empty("").label('Discord Link'),
            email_id: Joi.string().empty("").label('Email'),
            call: Joi.string().required().label('Call'),
            telegram_link: Joi.string().empty("").label('Telegram Link'),
        }).label("help")
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateAdd = (data: Request) => {
    const schema = Joi.object({
        help: Joi.object({           
            twitter_link: Joi.string().empty("").label('Twitter Link'),
            whatsapp_link: Joi.string().empty("").label('Whatsapp Link'),
            discord_link: Joi.string().empty("").label('Discord Link'),
            email_id: Joi.string().empty("").label('Email'),
            call: Joi.string().required().label('Call'),
            telegram_link: Joi.string().empty("").label('Telegram Link'),
        }).label("help")
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const getSocialMediaLinks = async (req: Request, res: Response) => {
    let data: any = {};
    let companyList: any = await Company.find({});
    
    data.social_media_links  = companyList
    res.status(200).json({ message: "The record has fetched successfully.", data: data });
};

const updateSocialMediaLinks = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) throw error;

    let company: any = await Company.findOne({ _id: req.body._id });
    if (!company) res.status(404).json({ message: "No record found." });

    company = _.assign(company, _.pick(req.body, ["help"]));
    company.updated_at = new Date().toISOString();
    company = company.save();

    res.status(200).json({ message: "The record has updated successfully." });
};

const addSocialLinks = async (req: Request, res: Response) => {
    const { error } = validateAdd(req.body);
    if (error) throw error;

    let announcement: any = new Company(_.pick(req.body, ["help"]));
    announcement = announcement.save();

    res.status(200).json({ message: "The record has saved successfully." });
}




export default { getSocialMediaLinks ,updateSocialMediaLinks, addSocialLinks,  }