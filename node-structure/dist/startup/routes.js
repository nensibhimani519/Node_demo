"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const helmet_1 = __importDefault(require("helmet"));
const _router_1 = __importDefault(require("../controllers/_router"));
exports.default = (app) => {
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use((0, express_1.json)());
    app.use("/", _router_1.default);
    app.use((req, res) => {
        res.status(404).json({ message: 'Url Not Found' });
    });
};
