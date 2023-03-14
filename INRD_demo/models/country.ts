import mongoose from "mongoose";

export const countrySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    country_name: { type: String, default: "", required: [true, "Country Name required."] },  
    country_code: { type: Number, default: null, required: [true, "Country Code required."] },  
    flag_img: { type: String, default: "", required: [true, "Flag Image required."] }
}, { collection: "country" });

export const Country = mongoose.model("Country", countrySchema);