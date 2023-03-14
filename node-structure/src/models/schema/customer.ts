import { Schema } from "mongoose";

export const customerSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, "Name is required."] },
    email: { type: String, required: [true, "Email is required."] },
    mobile: { type: String, required: [true, "Mobile is required."] },
    otp: { type: String, default: "" },
  },
  { collection: "customer" }
);
