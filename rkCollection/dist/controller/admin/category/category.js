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
const collections_1 = require("../../../models/collections");
const validate = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().max(50).label('Name'),
        parent: joi_1.default.string().empty("").label('Parent'),
        categories: joi_1.default.array().items(joi_1.default.string().hex().length(24)).label('Categories'),
        specifications: joi_1.default.array().items(joi_1.default.string().hex().length(24)).label('Specifications'),
        specification_options: joi_1.default.array().items(joi_1.default.string().hex().length(24)).label('Specifications Options'),
        product_filter_tags: joi_1.default.array().items(joi_1.default.string().hex().length(24)).label('Product Filter Tags'),
        disc_perc: joi_1.default.number().empty(0).label('Disc Perc'),
        description: joi_1.default.string().empty("").label('Description'),
        meta_title: joi_1.default.string().empty("").max(100).label('Meta Title'),
        meta_desc: joi_1.default.string().empty("").max(200).label('Meta Description'),
        url_keyword: joi_1.default.string().empty("").label('URL Keyword'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let data = {};
    let collection = new collections_1.Collections(lodash_1.default.pick(req.body, ["name", "categories", "specifications", "specification_options", "product_filter_tags", "min_rate", "max_rate", "disc_perc", "description", "meta_title", "meta_desc", "url_keyword"]));
    collection = yield collection.save();
    data.collection = collection;
    res.status(200).json({ message: "The record has saved successfully.", data: data });
});
exports.default = { add, };
//# sourceMappingURL=category.js.map