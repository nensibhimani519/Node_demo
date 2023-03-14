import mongoose from "mongoose";

export const appContentSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    content_code : { type: String, default: "", required: [true, "Content Code required."] },  
    description : { type: String, default: "", required: [true, "Description required."] },  
}, { collection: "app_content" });

export const AppContent = mongoose.model("AppContent", appContentSchema);