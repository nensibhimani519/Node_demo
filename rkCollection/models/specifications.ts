import mongoose from "mongoose";

const optionsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: [true, "Name required."], maxlength: 50 },
    code: { type: String, default: "", maxlength: 3, match: [/^[-A-Z0-9\._]*$/, "Enter valid code."] },
    color_code: { type: String, default: "", maxlength: 7 }
})

export const specificationsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    type: { type: Number, required: [true, "Type required."], enum: [1, 2] },
    name: { type: String, required: [true, "Name required."], maxlength: 50 },
    is_variant: { type: Number, default: 0 },
    options: [{ type: optionsSchema }],
    status: { type: Number, default: 1, enum: [0, 1] }   
}, { collection: "specifications" })

export const Specifications = mongoose.model("Specifications", specificationsSchema);
export const statusArray: any = { 0: "Disable", 1: "Enable"}
export const typeArray: any = { 1: "Input", 2: "Color"}                                         