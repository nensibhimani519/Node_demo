import { Schema } from "mongoose";

export const wishlistSchema = new Schema(
  {
    wishlist_name: {
      type: String,
      required: true,
      // unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      reuired: [true, "User Id is required."],
      ref: "User",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
  },
  { collection: "wishlist" }
);
