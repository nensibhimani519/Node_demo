import { Schema } from "mongoose";

export const orderSchema = new Schema(
  {
    p_code: {
      type: String,
      required: [true, "Product code is required."],
    },
    order_no: {
      type: String,
      required: [true, "Product code is required."],
      unique: true,
    },
    qty: {
      type: Number,
      required: [true, "Stock is required."],
    },
    status: {
      type: String,
      required: [true, "Status is required."],
    },
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
  },
  { collection: "order" }
);
