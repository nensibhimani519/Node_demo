"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("./product"));
const router = (0, express_1.Router)();
router.get("/", product_1.default.productList);
router.post("/add", product_1.default.addProduct);
router.post("/edit", product_1.default.editProduct);
router.post("/delete", product_1.default.deleteProduct);
exports.default = router;
//# sourceMappingURL=_router.js.map