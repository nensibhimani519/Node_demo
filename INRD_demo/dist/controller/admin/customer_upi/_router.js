"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_upi_1 = __importDefault(require("./customer_upi"));
const router = (0, express_1.Router)();
router.post("/get_upi_list", customer_upi_1.default.getUpiList);
router.post("/get_upi_info", customer_upi_1.default.getUpiInfo);
exports.default = router;
//# sourceMappingURL=_router.js.map