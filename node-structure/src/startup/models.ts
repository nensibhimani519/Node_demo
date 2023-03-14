import { model } from "mongoose";
import { categorySchema } from "../models/schema/category";
import { customerSchema } from "../models/schema/customer";
import { productSchema } from "../models/schema/product";
import { userSchema } from "../models/schema/user";

export default () => {
  model("Users", userSchema),
    model("Customer", customerSchema),
    model("Product", productSchema),
    model("Category", categorySchema);
};
