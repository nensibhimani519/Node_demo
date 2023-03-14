"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const customer_1 = require("../../../models/customer");
const lodash_1 = __importDefault(require("lodash"));
const validate = (data) => {
    const schema = joi_1.default.object({
        fcm_token: joi_1.default.string().required().label('FCM Token'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const addFcmToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let fcmToken = new customer_1.Customer(lodash_1.default.pick(req.body, ["fcm_token"]));
    fcmToken.customer = req.body._cid;
    fcmToken = yield fcmToken.save();
    res.status(200).json({ message: "The record has saved successfully." });
});
exports.default = { addFcmToken };
//# sourceMappingURL=devicetoken.js.map