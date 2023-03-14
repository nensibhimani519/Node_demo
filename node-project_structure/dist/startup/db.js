"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const default_json_1 = __importDefault(require("../config/default.json"));
exports.default = () => {
    if (default_json_1.default.dbConfig && default_json_1.default.dbConfig.db != "") {
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.set("runValidators", true);
        let dbConnectionStr = default_json_1.default.dbConfig.db;
        mongoose_1.default.connect(dbConnectionStr, { autoIndex: true, autoCreate: true }, function (err) {
            if (err) {
                console.error(err.message);
                process.exit(1);
            }
            else {
                // logger.info(`Connected to ${dbConnectionStr}...`);
            }
        });
    }
    else {
        console.log("Config db is not set in config file.");
        process.exit(1);
    }
    return new Promise((resolve, reject) => { });
};
//# sourceMappingURL=db.js.map