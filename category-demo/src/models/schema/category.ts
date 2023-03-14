import { Schema } from "mongoose";

export const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
      unique: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
    },
  },
  { collection: "category" }
);
