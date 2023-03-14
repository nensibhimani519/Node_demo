import { model } from "mongoose";
import { customerSchema } from "../schema/customer";
import { Request } from "express";
import Joi from "joi";

const Customer = model("Customer", customerSchema);

const validate = (data: Request) => {
  const schema = Joi.object({
    name: Joi.string().required().max(50).min(4).label("name"),
    email: Joi.string().required().label("email"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export { validate, Customer };
