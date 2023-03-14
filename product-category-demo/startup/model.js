import mongoose from "mongoose";
import { categorySchema } from "../models/category.js";

export default () => {
  mongoose.model("Category", categorySchema);
};
