import { model } from "mongoose";
import { categorySchema } from "../models/schema/category";
import { productSchema } from "../models/schema/product";
import { customerSchema } from "../models/schema/customer";

export default () => {
  model("Category", categorySchema);
  model("Product", productSchema);
  model("Customer", customerSchema);
};
