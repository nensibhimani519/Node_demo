"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("./login"));
const router = (0, express_1.Router)();
router.post("/send_otp", login_1.default.sendOtp);
router.post("/verify_otp", login_1.default.verifyOtp);
exports.default = router;
//# sourceMappingURL=_router.js.map