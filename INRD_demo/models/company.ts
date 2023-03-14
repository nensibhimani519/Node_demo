import mongoose from "mongoose";

const helpSchema = new mongoose.Schema({
    telegram_link: { type: String, default: "" },
    whatsapp_link: { type: String, default: "" },
    discord_link: { type: String, default: "" },
    twitter_link: { type: String, default: "" },
    email_id: { type: String, default: "" },
    call: { type: String, default: "" }
});

export const companySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    help: { type: helpSchema }
}, { collection: "company" });

export const Company = mongoose.model("Company", companySchema);