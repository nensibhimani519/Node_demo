import { Request } from "express";
import Joi from "joi";
import { model } from "mongoose";
import { categorySchema } from "../schema/category";

const Category = model("Category", categorySchema);

const validate = (data: Request) => {
    const schema = Joi.object({
        name: Joi.string().required().max(50).min(3).label('Name')
    });

    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};


export { validate, Category }