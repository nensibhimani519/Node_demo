import mongoose from "mongoose";

export const notificationSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title : { type: String, default: "", required: [true, "Title required."] },  
    description : { type: String, default: "", required: [true, "Description required."] },  
    img: { type: String, default: "", required: [true, "Image required."] }, 
    data: { type: Object, default: null },
    customer: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Customer" },
    status: { type: Number, default: 1 },
    created_at: { type: Date, default: new Date().toISOString() }
}, { collection: "notification" });

export const Notification = mongoose.model("Notification", notificationSchema);