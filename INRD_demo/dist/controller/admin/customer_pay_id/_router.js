"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_pay_id_1 = __importDefault(require("./customer_pay_id"));
const router = (0, express_1.Router)();
router.post("/get_pay_id_list", customer_pay_id_1.default.getPayIdList);
router.post("/get_pay_id_info", customer_pay_id_1.default.getPayIdInfo);
exports.default = router;
//# sourceMappingURL=_router.js.map