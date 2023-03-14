"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _router_1 = __importDefault(require("./category/_router"));
const _router_2 = __importDefault(require("./product/_router"));
const _router_3 = __importDefault(require("./customer/_router"));
const _router_4 = __importDefault(require("./wishlist/_router"));
const _router_5 = __importDefault(require("./order/_router"));
const app = (0, express_1.default)();
app.use("/category", _router_1.default);
app.use("/product", _router_2.default);
app.use("/customer", _router_3.default);
app.use("/wishlist", _router_4.default);
app.use("/order", _router_5.default);
exports.default = app;
//# sourceMappingURL=_router.js.map