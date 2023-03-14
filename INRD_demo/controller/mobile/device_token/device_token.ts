import { Request, Response } from "express";
import Joi from "joi";
import { Customer } from "../../../models/customer";
import _ from "lodash";

const validate = (data: Request) => {
    const schema = Joi.object({
        fcm_token: Joi.string().required().label('FCM Token'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

const addFcmToken = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) throw error;

    let fcmToken: any = new Customer(_.pick(req.body, [ "fcm_token"]));

    fcmToken.customer = req.body._cid;
    fcmToken = await fcmToken.save();
    res.status(200).json({ message: "The record has saved successfully." });
};

export default { addFcmToken }