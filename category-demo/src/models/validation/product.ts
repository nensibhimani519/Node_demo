import { model } from "mongoose";
import { productSchema } from "../schema/product";
import { Request } from "express";
import Joi from "joi";

const Product = model("Product", productSchema);

const validate = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().required().max(50).min(3).label("name"),
    price: Joi.number().integer().required().label("price"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export { validate, Product };
