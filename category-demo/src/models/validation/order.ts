import { model } from "mongoose";
import { orderSchema } from "../schema/order";
import { Request } from "express";
import Joi from "joi";

const Order = model("Order", orderSchema);

const validate = (data: Request) => {
  const schema = Joi.object({
    p_code: Joi.string().required().max(50).min(3).label("code"),
    order_no: Joi.string().required().max(50).min(3).label("no"),
    qty: Joi.number().integer().required().label("qty"),
    status: Joi.string().required().max(50).min(3).label("status"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export { validate, Order };
