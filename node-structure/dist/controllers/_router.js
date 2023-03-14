"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _router_1 = __importDefault(require("./admin/auth/_router"));
const _router_2 = __importDefault(require("./admin/category/_router"));
const app = (0, express_1.default)();
app.use("/admin/auth", _router_1.default);
app.use("/admin/category", _router_2.default);
exports.default = app;
