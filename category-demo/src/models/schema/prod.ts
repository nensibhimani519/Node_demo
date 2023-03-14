import { Schema } from "mongoose";

export const prodSchema = new Schema(
  {
    p_code: {
      type: String,
      required: [true, "Product code is required."],
      unique: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required."],
    },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
  },
  { collection: "product" }
);
