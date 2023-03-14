import { Schema } from "mongoose";

export const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
  },
  { collection: "product" }
);
