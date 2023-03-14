"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const db_1 = __importDefault(require("./startup/db"));
const models_1 = __importDefault(require("./startup/models"));
const routes_1 = __importDefault(require("./startup/routes"));
const error_1 = __importDefault(require("./startup/error"));
const app = (0, express_1.default)();
(0, db_1.default)();
(0, models_1.default)();
(0, routes_1.default)(app);
(0, error_1.default)();
const port = config_1.default.get("port") || 5000;
app.listen(port, () => console.log(`connnected on port ${port}`));
