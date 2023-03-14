"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_bank_1 = __importDefault(require("./customer_bank"));
const router = (0, express_1.Router)();
router.post("/get_bank_list", customer_bank_1.default.getBankList);
router.post("/get_bank_info", customer_bank_1.default.getBankInfo);
exports.default = router;
//# sourceMappingURL=_router.js.map