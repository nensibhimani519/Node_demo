"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("./category"));
const router = (0, express_1.Router)();
router.post("/", category_1.default.index);
router.post("/add", category_1.default.add);
router.post("/view", category_1.default.view);
router.post("/edit", category_1.default.edit);
router.post("/remove", category_1.default.remove);
router.post("/status", category_1.default.status);
exports.default = router;
