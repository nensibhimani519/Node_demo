"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const withdraw_1 = __importDefault(require("./withdraw"));
const router = (0, express_1.Router)();
router.post("/get_withdraw_request_list", withdraw_1.default.getWithdrawRequestList);
router.post("/get_withdraw_request_info", withdraw_1.default.getWithdrawRequestInfo);
router.post("/approve", withdraw_1.default.approveWithdrawRequest);
router.post("/reject", withdraw_1.default.rejectWithdrawRequest);
exports.default = router;
//# sourceMappingURL=_router.js.map