"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
exports.default = () => {
    if (config_1.default.has("dbUrl")) {
        const dbUrl = config_1.default.get("dbUrl");
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.connect(dbUrl, (err) => {
            if (err) {
                process.exit(1);
            }
            else {
                console.log("Database connected successfully..!");
            }
        });
    }
    else {
        console.log("unable to connect database, please try again later");
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map