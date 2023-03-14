"use strict";
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
const lodash_1 = __importDefault(require("lodash"));
const customer_1 = require("../../models/validation/customer");
const customerList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customer_1.Customer.find();
    res.status(200).json({
        message: "customer get Sucessfully!",
        data: customers,
    });
});
const addCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield (0, customer_1.validate)(req.body);
    if (error)
        throw error;
    let uniqueName = yield customer_1.Customer.findOne({
        name: req.body.name,
    });
    if (uniqueName)
        return res.status(400).json({ message: "Customer name already Exist." });
    let customer = new customer_1.Customer(lodash_1.default.pick(req.body, ["name", "email"]));
    const customer_data = yield customer.save();
    res.status(200).json({
        message: "customer add Sucessfully!",
        data: customer_data,
    });
});
exports.default = { addCustomer, customerList };
//# sourceMappingURL=customer.js.map