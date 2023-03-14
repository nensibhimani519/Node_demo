import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
  },
  { collection: "category" }
);

export const Category = mongoose.model("Category", categorySchema);
