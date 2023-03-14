import mongoose from "mongoose";

export const deviceTokenSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    fcm_token : { type: String, default: "", required: [true, "Fcm Token required."] },  
    customer : { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: [true, "Customer required."] },  
}, { collection: "device_token" });

export const DeviceToken = mongoose.model("DeviceToken", deviceTokenSchema);