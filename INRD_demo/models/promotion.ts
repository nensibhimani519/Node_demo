import mongoose from "mongoose";

export const promotionSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    img: { type: String, default: "", required: [true, "Image required."] }, 
	active_from : { type: Date, default: new Date().toISOString(), required: [true, "Active From required."] },
    active_to: { type: Date, default: new Date().toISOString(), required: [true, "Active To required."] },   
	frequency  : { type: Number, default: 1 },  
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() } 
}, { collection: "promotion" });

export const Promotion = mongoose.model("Promotion", promotionSchema);
