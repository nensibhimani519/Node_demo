import { Request } from "express";
import { categorySchema } from "../schema/category";
import { model } from "mongoose";
import Joi from "joi";

const Category = model("Category", categorySchema);

const validate = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().required().max(50).min(3).label("category_name"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export { validate, Category };
