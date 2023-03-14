"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("./category"));
const router = (0, express_1.Router)();
router.post("/category/add", category_1.default.add);
exports.default = router;
//# sourceMappingURL=_router.js.map