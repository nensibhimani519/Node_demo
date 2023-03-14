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
        console.log(dbUrl, "dbUrl");
        const dbOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        };
        mongoose_1.default.connect(dbUrl, dbOptions, (err) => {
            if (err) {
                console.log(err.message);
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
