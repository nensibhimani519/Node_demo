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
const product_1 = require("../../models/validation/product");
const productList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalItems = yield product_1.Product.find().countDocuments();
    const products = yield product_1.Product.find();
    res.status(200).json({
        message: "product get Sucessfully!",
        totalRecords: totalItems,
        data: products,
    });
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, product_1.validate)(req.body);
    if (error)
        throw error;
    let uniqueName = yield product_1.Product.findOne({
        name: req.body.name,
    });
    if (uniqueName)
        return res.status(400).json({ message: "Product name already Exist." });
    let product = new product_1.Product(lodash_1.default.pick(req.body, ["name", "price"]));
    const product_data = yield product.save();
    res.status(200).json({
        message: "product add Sucessfully!",
        data: product_data,
    });
});
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, product_1.validate)(req.body);
    if (error)
        throw error;
    let uniqueName = yield product_1.Product.findOne({
        name: req.body.name,
        _id: { $ne: req.body._id },
    });
    if (uniqueName)
        return res.status(400).json({ message: "Product name already Exist." });
    const productId = yield product_1.Product.findOne({ _id: req.body._id });
    if (!productId) {
        return res.status(404).json({ message: "Product Not Found!" });
    }
    const product = lodash_1.default.assign(productId, lodash_1.default.pick(req.body, ["name", "price"]));
    product.updated_on = new Date().toISOString();
    product.save();
    return res
        .status(200)
        .json({ message: "Product Updated successfully!!", data: product });
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield product_1.Product.findOneAndRemove({ _id: req.body._id });
    if (!product) {
        return res.status(404).json({ message: "Product Not Found!" });
    }
    return res.status(200).json({ message: "Product Deleted successfully!!" });
});
exports.default = { productList, addProduct, editProduct, deleteProduct };
//# sourceMappingURL=product.js.map