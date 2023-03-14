import { model } from "mongoose";
import { collectionSchema } from "../models/collections";
import { categorySchema } from "../models/category";
import { productCodeCategorySchema } from "../models/product_code_category";
import { specificationsSchema } from "../models/specifications";

export default () => {
  model("Collections", collectionSchema);
  model("Category", categorySchema);
  model("ProductCodeCategory", productCodeCategorySchema);
  model("Specifications", specificationsSchema);
};
