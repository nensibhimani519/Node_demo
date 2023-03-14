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
const category_1 = require("../../models/validation/category");
const lodash_1 = __importDefault(require("lodash"));
const categoryList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalItems = yield category_1.Category.find().countDocuments();
    const categories = yield category_1.Category.find().sort({ name: 1 });
    res.status(200).json({
        message: "category get Sucessfully!",
        totalRecords: totalItems,
        data: categories,
    });
});
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, category_1.validate)(req.body);
    if (error)
        throw error;
    let uniqueName = yield category_1.Category.findOne({
        category_name: req.body.category_name,
    });
    if (uniqueName)
        return res.status(400).json({ message: "Wishlist name already Exist." });
    let category = new category_1.Category(lodash_1.default.pick(req.body, ["category_name"]));
    const category_data = yield category.save();
    res.status(200).json({
        message: "category add Sucessfully!",
        data: category_data,
    });
});
const getByIdCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let category1 = yield category_1.Category.findOne({ _id: req.body._id });
    if (!category1)
        return res.status(404).json({ message: "Category Not Found!" });
    return res.status(200).json({ message: "Category Fetch successfully!!" });
});
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield category_1.Category.findOneAndRemove({ _id: req.body._id });
    if (!category)
        return res.status(404).json({ message: "Category Not Found!" });
    return res.status(200).json({ message: "Category Deleted successfully!!" });
});
exports.default = { addCategory, categoryList, deleteCategory, getByIdCategory };
//# sourceMappingURL=category.js.map