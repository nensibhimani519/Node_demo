"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
router.get("/home", (req, res) => {
    res.json({
        message: "Home Page",
    });
});
router.get("/about", (req, res) => {
    res.json({
        message: "About Page",
    });
});
