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
const category_1 = require("../../../models/validation/category");
const lodash_1 = __importDefault(require("lodash"));
const categoryView = (category) => __awaiter(void 0, void 0, void 0, function* () {
    category = lodash_1.default.pick(category, ['_id', 'name', 'status', 'created_on', 'updated_on']);
    return category;
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let skipNumber = (req.body.skip_number) ? req.body.skip_number : 0;
    let recordPerPage = (req.body.record_per_page) ? req.body.record_per_page : 20;
    let sortBy = (req.body.sort_by) ? req.body.sort_by : '_id';
    let sortType = (req.body.sort_type) ? req.body.sort_type : -1;
    let allowSortBy = ['name', 'status'];
    sortBy = (allowSortBy.includes(sortBy)) ? sortBy : '_id';
    let sort = {};
    sort[sortBy] = sortType;
    let skip = skipNumber;
    let limit = recordPerPage;
    let filter = new Object();
    if (req.body.name) {
        filter['name'] = new RegExp(req.body.name, 'i');
    }
    let result = {};
    if (skipNumber == 0) {
        let totalRecords = yield category_1.Category.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.data = yield category_1.Category
        .find({ $and: [filter] })
        .select({ name: 1, status: 1 })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
    res.status(200).json(result);
});
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield (0, category_1.validate)(req.body);
    if (error)
        throw error;
    let category = new category_1.Category(lodash_1.default.pick(req.body, ["name"]));
    category.created_on = new Date().toISOString(),
        category.updated_on = new Date().toISOString(),
        category = yield category.save();
    category = yield categoryView(category);
    res.status(200).json({
        message: 'The record has saved successfully.',
        data: category
    });
});
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield category_1.Category.findOne({ _id: req.body._id });
    if (!category)
        return res.status(404).json({ message: "No record found." });
    category = yield categoryView(category);
    res.status(200).json({
        data: category
    });
});
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, category_1.validate)(req.body);
    if (error) {
        throw error;
    }
    let category = yield category_1.Category.findOne({ _id: req.body._id });
    if (!category)
        return res.status(404).json({ message: "No record found." });
    category.updated_on = new Date().toISOString();
    category = category.save();
    category = yield categoryView(category);
    res.status(201).json({
        message: 'The record has udpated successfully.',
        data: category
    });
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield category_1.Category.findOneAndRemove({ _id: req.body._id });
    if (!category)
        return res.status(404).json({ message: "No recored found." });
    res.status(200).json({ message: 'The record has deleted successfully.' });
});
const status = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield category_1.Category.findOne({ _id: req.body._id });
    if (!category)
        return res.status(404).json({ message: "No recored found." });
    category.status = !category.status;
    category.updated_on = new Date().toISOString();
    category = category.save();
    res.status(200).json({ message: 'The status has changed successfully.' });
});
exports.default = { index, add, view, edit, remove, status };
