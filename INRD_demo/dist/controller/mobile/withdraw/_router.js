"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const withdraw_1 = __importDefault(require("./withdraw"));
const router = (0, express_1.Router)();
router.post("/get_currency_list", withdraw_1.default.getCurrencyList);
router.post("/add_withdraw_request", withdraw_1.default.addWithdrawRequest);
router.post("/get_withdraw_request_list", withdraw_1.default.getWithdrawRequestList);
exports.default = router;
//# sourceMappingURL=_router.js.map