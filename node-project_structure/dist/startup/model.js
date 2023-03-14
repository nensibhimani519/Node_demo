"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const module_1 = require("../models/module");
exports.default = () => {
    mongoose_1.default.model("Module", module_1.moduleSchema);
};
//# sourceMappingURL=model.js.map