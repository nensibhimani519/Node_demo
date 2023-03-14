"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_1 = __importDefault(require("./customer"));
const router = (0, express_1.Router)();
router.get("/", customer_1.default.customerList);
router.post("/add", customer_1.default.addCustomer);
exports.default = router;
//# sourceMappingURL=_router.js.map