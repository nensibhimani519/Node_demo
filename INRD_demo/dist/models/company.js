"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = exports.companySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const helpSchema = new mongoose_1.default.Schema({
    telegram_link: { type: String, default: "" },
    whatsapp_link: { type: String, default: "" },
    discord_link: { type: String, default: "" },
    twitter_link: { type: String, default: "" },
    email_id: { type: String, default: "" },
    call: { type: String, default: "" }
});
exports.companySchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    help: { type: helpSchema }
}, { collection: "company" });
exports.Company = mongoose_1.default.model("Company", exports.companySchema);
//# sourceMappingURL=company.js.map