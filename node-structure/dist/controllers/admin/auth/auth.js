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
Object.defineProperty(exports, "__esModule", { value: true });
const encription_1 = require("../../../helper/encription");
const user_1 = require("../../../models/validation/user");
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_1.validateAuth)(req.body);
    if (error)
        throw error;
    let user = yield user_1.User.findOne({ email_id: req.body.username });
    if (!user)
        return res.status(400).json({ message: "Invlid username or password! Please try again." });
    if (!user.status)
        return res.status(400).json({ message: "Your account has been disabled." });
    let password = yield (0, encription_1.encrypt)(req.body.password);
    if (user.password != password)
        return res.status(400).json({ message: "Invlid username or password! Please try again." });
    const token = yield user.getAccessToken();
    res.status(200).setHeader("x-auth-token", token).json({ message: "User login successfully." });
});
exports.default = { index };
