import { Request, Response } from "express";
import _ from "lodash";
import Joi from "joi";
import { Customer } from "../../../models/customer";

const validateSendOtp = (data: Request) => {
    const schema = Joi.object({
        country_code: Joi.string().required().label('Country Code'),
        mobile_no: Joi.string().required().max(10).label('Mobile No.'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const validateVerifyOtp = (data: Request) => {
    const schema = Joi.object({
        country_code: Joi.string().required().label('Country Code'),
        mobile_no: Joi.string().required().max(10).label('Mobile No.'),
        otp: Joi.number().required().label('OTP'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const sendOtp = async (req: Request, res: Response) => {
    const { error } = validateSendOtp(req.body);
    if (error) throw error;

    let customer: any = await Customer.findOne({ country_code: req.body.country_code, mobile_no: req.body.mobile_no });
    if (!customer) return res.status(404).json({ message: "No record found." });

    customer.otp = 1234;
    customer = await customer.save();
    res.status(200).json({message: "OTP send successfully."});
};

const verifyOtp = async (req: Request, res: Response) => {
    const { error } = validateVerifyOtp(req.body);
    if (error) throw error;

    let customer: any = await Customer.findOne({ country_code: req.body.country_code, mobile_no: req.body.mobile_no, otp: req.body.otp });
    if (!customer) return res.status(404).json({ message: "No record found." });
    
    const token = await customer.getAccessToken();
    res.status(200).setHeader("x-auth-token", token).json({ message: "Login successfully." });
}

export default { sendOtp, verifyOtp };
