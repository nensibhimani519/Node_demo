"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _router_1 = __importDefault(require("./admin/system/_router"));
const app = (0, express_1.default)();
app.use("/app/system", _router_1.default);
exports.default = app;
//# sourceMappingURL=_router.js.map