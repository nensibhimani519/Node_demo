import { Request } from "express";
import { model } from "mongoose";
import Joi from "joi";
import { wishlistSchema } from "../schema/wishlist";

const Wishlist = model("Wishlist", wishlistSchema);

const validate = (data: Request) => {
  const schema = Joi.object({
    wishlist_name: Joi.string()
      .required()
      .max(50)
      .min(3)
      .label("Wishlist Name"),
    products: Joi.array()
      .items(Joi.string().hex().length(24).required())
      .label("ProdutId"),
    userId: Joi.string().hex().length(24).required().label("UserId"),
  });

  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

export { validate, Wishlist };
