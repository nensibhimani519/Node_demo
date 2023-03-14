import { model } from "mongoose";
import { prodSchema } from "../schema/prod";
import { Request } from "express";
import Joi from "joi";

const Prod = model("Prod", prodSchema);

const validate = (data: Request) => {
  const schema = Joi.object({
    p_code: Joi.string().required().max(50).min(3).label("Product code"),
    stock: Joi.number().integer().required().label("stock"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export { validate, Prod };
