import mongoose from "mongoose";

export const moduleSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: {
      type: String,
      required: [true, "The name is required."],
      maxlength: 100,
    },
    type: { type: Number, required: [true, "The type is required."] },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Module",
    },
    position: { type: Number, required: [true, "The position is required."] },
    is_hidden: { type: Number, default: 0 },
    icon: { type: String, maxlength: 100, default: "" },
    link: { type: String, maxlength: 200, default: "" },
    other_icon: { type: String, maxlength: 100, default: "" },
    other_link: { type: String, maxlength: 200, default: "" },
    search_keyword: { type: String, maxlength: 200, default: "" },
    count_key: { type: String, default: "" },
  },
  { collection: "module" }
);

// export type module = {
//   _id: string;
//   name: string;
//   type: any;
//   parent: any;
//   position: number;
//   is_hidden: number;
//   icon: string;
//   link: string;
//   other_icon: string;
//   other_link: string;
//   search_keyword: string;
//   count_key: string;
// };

export const Module = mongoose.model("Module", moduleSchema);
// export const typeArray: any = { 0: "Menu", 1: "Module", 2: "Separator" };
