"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_interac_id_1 = __importDefault(require("./customer_interac_id"));
const router = (0, express_1.Router)();
router.post("/get_interac_id_list", customer_interac_id_1.default.getInteracIdList);
router.post("/get_interac_id_info", customer_interac_id_1.default.getInteracIdInfo);
exports.default = router;
//# sourceMappingURL=_router.js.map