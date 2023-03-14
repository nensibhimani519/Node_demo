import mongoose from "mongoose";

export const announcementSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    description : { type: String, default: "", required: [true, "Description required."] },  
    currency_code : { type: String, default: "" },  
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: Date, default: new Date().toISOString() } 
}, { collection: "announcement" });

export const Announcement = mongoose.model("Announcement", announcementSchema);