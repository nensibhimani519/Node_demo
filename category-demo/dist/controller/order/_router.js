"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = __importDefault(require("./order"));
const router = (0, express_1.Router)();
router.get("/", order_1.default.orderList);
router.get("/prod", order_1.default.prodList);
router.get("/order_inventory", order_1.default.orderInventory);
// router.post("/order", order.addorder);
// router.delete("/view", order.getByIdorder);
// router.delete("/delete", order.deleteorder);
exports.default = router;
//# sourceMappingURL=_router.js.map