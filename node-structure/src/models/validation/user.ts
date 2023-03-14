import { Request } from "express";
import Joi from 'joi';
import { model } from "mongoose";
import { userSchema } from "../schema/user";

const User = model('Users', userSchema);

const validateAuth = (data: Request) => {
    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().min(8).max(14).label("Password")
    });

    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export { User, validateAuth };