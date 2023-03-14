"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./startup/db"));
const model_1 = __importDefault(require("./startup/model"));
const routes_1 = __importDefault(require("./startup/routes"));
const default_json_1 = __importDefault(require("./config/default.json"));
const error_1 = __importDefault(require("./startup/error"));
const app = (0, express_1.default)();
(0, db_1.default)();
(0, model_1.default)();
(0, routes_1.default)(app);
(0, error_1.default)();
const port = (process.env.PORT || default_json_1.default.port);
app.listen(port, () => console.log(`connnected on port ${port}`));
exports.default = app;
//# sourceMappingURL=index.js.map