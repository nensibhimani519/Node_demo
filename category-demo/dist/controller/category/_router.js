"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("./category"));
const router = (0, express_1.Router)();
router.get("/", category_1.default.categoryList);
router.post("/category", category_1.default.addCategory);
router.delete("/view", category_1.default.getByIdCategory);
router.delete("/delete", category_1.default.deleteCategory);
exports.default = router;
//# sourceMappingURL=_router.js.map