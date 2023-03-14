"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = exports.countrySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.countrySchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Schema.Types.ObjectId, auto: true },
    country_name: { type: String, default: "", required: [true, "Country Name required."] },
    country_code: { type: Number, default: null, required: [true, "Country Code required."] },
    flag_img: { type: String, default: "", required: [true, "Flag Image required."] }
}, { collection: "country" });
exports.Country = mongoose_1.default.model("Country", exports.countrySchema);
//# sourceMappingURL=country.js.map