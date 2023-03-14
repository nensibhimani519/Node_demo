"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const device_token_1 = __importDefault(require("./device_token"));
const router = (0, express_1.Router)();
router.post("/add_fcm_token", device_token_1.default.addFcmToken);
exports.default = router;
//# sourceMappingURL=_router.js.map