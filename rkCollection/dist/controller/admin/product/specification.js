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
const joi_1 = __importDefault(require("joi"));
const lodash_1 = __importDefault(require("lodash"));
const specifications_1 = require("../../../models/specifications");
const validate = (data) => {
    const schema = joi_1.default.object({
        type: joi_1.default.number().required().label('Type'),
        name: joi_1.default.string().required().max(50).label('Name'),
        is_variant: joi_1.default.number().empty(0).label('Is Variant'),
        options: joi_1.default.array().when("is_variant", {
            is: 1,
            then: joi_1.default.array().items(joi_1.default.object({
                name: joi_1.default.string().required().max(50),
                code: joi_1.default.string().required().max(3).regex(/^[-A-Z0-9\._]*$/),
                color_code: joi_1.default.string().empty("").max(7),
            })),
            otherwise: joi_1.default.array().items(joi_1.default.object({
                name: joi_1.default.string().required().max(50),
                code: joi_1.default.string().empty("").max(3).regex(/^[-A-Z0-9\._]*$/),
                color_code: joi_1.default.string().empty("").max(7),
            }))
        }).required().label('Options'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const specificationView = (specification) => __awaiter(void 0, void 0, void 0, function* () {
    specification = lodash_1.default.pick(specification, ["_id", "name", "type", "is_variant", "options", "status"]);
    specification.type = { _id: specification.type, name: specifications_1.typeArray[specification.type] };
    specification.status = { _id: specification.status, name: specifications_1.statusArray[specification.status] };
    return specification;
});
const specificationStatusView = (specification) => __awaiter(void 0, void 0, void 0, function* () {
    specification = lodash_1.default.pick(specification, ["_id", "status"]);
    specification.status = { _id: specification.status, name: specifications_1.statusArray[specification.status] };
    return specification;
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let skipNumber = req.body.skip_number ? req.body.skip_number : 1;
    let recordPerPage = req.body.record_per_page ? req.body.record_per_page : 5;
    let sortBy = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType = req.body.sort_type ? req.body.sort_type : -1;
    let allowSortBy = ["name", "type", "is_variant", "status"];
    sortBy = allowSortBy.includes(sortBy) ? sortBy : "_id";
    let sort = {};
    sort[sortBy] = sortType;
    let skip = skipNumber;
    let limit = recordPerPage;
    let filter = new Object();
    if (req.body.name)
        filter["name"] = new RegExp(req.body.name, "i");
    if (req.body.hasOwnProperty('status') && req.body.status !== '')
        filter['status'] = req.body.status;
    let result = {};
    if (skipNumber == 1) {
        let totalRecords = yield specifications_1.Specifications.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
        let master = {};
        master.status = specifications_1.statusArray;
        result.master = master;
    }
    result.data = yield specifications_1.Specifications.find({ $and: [filter] }).select({ name: 1, type: 1, is_variant: 1, status: 1 }).sort(sort).skip(skip).limit(limit).lean();
    result.data = result.data.map((el) => {
        el.type = { _id: el.type, name: specifications_1.typeArray[el.type] };
        el.status = { _id: el.status, name: specifications_1.statusArray[el.status] };
        return el;
    });
    res.status(200).json(result);
});
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let specification = new specifications_1.Specifications(lodash_1.default.pick(req.body, ["name", "type", "is_variant", "options", "status"]));
    specification = yield specification.save();
    specification = yield specificationView(specification);
    specification = specification;
    res.status(200).json({ message: "The record has saved successfully.", data: specification });
});
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dataRequest = (req.body && req.body._id) ? true : false;
    let masterRequest = (req.body.master_request && req.body.master_request === 1) ? true : false;
    let specification = {};
    if (dataRequest) {
        let data = yield specifications_1.Specifications.findOne({ _id: req.body._id });
        if (!data)
            return res.status(404).json({ message: "No record found." });
        specification.data = yield specificationView(data);
    }
    ;
    if (masterRequest) {
        specification.master = {};
        specification.master.type = specifications_1.typeArray;
    }
    ;
    res.status(200).json(specification);
});
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let specification = yield specifications_1.Specifications.findOne({ _id: req.body._id });
    if (!specification)
        res.status(404).json({ message: "No record found." });
    specification = lodash_1.default.assign(specification, lodash_1.default.pick(req.body, ["name", "type", "is_variant", "options", "status"]));
    specification = yield specification.save();
    specification = yield specificationView(specification);
    res.status(200).json({ message: "The record has updated successfully.", data: specification });
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let specification = yield specifications_1.Specifications.findOneAndRemove({ _id: req.body._id });
    if (!specification)
        return res.status(404).json({ message: "No recored found." });
    res.status(200).json({ message: "The record has deleted successfully." });
});
const status = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let specification = yield specifications_1.Specifications.findOne({ _id: req.body._id });
    if (!specification)
        return res.status(404).json({ message: "No recored found." });
    specification.status = !specification.status;
    specification = yield specification.save();
    specification = yield specificationStatusView(specification);
    res.status(200).json({ message: "The status has changed successfully.", data: specification });
});
exports.default = { index, add, view, edit, remove, status };
//# sourceMappingURL=specification.js.map