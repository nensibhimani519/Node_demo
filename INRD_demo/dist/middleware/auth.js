"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobileAuth = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const default_json_1 = __importDefault(require("../config/default.json"));
const customer_1 = require("../models/customer");
const encription_1 = require("../helper/encription");
const mobileAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers['x-auth-token'];
        if (!token)
            return res.status(401).json({ message: "Authentication failed!" });
        token = yield (0, encription_1.decrypt)(token);
        const decodedToken = jwt.verify(token, default_json_1.default.jwtPrivateKey);
        let _id = decodedToken.cid ? decodedToken.cid : null;
        let customer = yield customer_1.Customer.findOne({ _id: _id });
        if (!customer)
            return res.status(401).json({ message: "Authentication failed!" });
        req.body._cid = _id;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Authentication failed!" });
    }
});
exports.mobileAuth = mobileAuth;
//# sourceMappingURL=auth.js.map