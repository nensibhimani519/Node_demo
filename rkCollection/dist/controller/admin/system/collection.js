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
const specifications_1 = require("../../../models/specifications");
const upload_1 = require("../../../helper/upload");
const collections_2 = require("../../../models/collections");
const validate = (data) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().max(50).label('Name'),
        categories: joi_1.default.array().items(joi_1.default.string().hex().length(24)).label('Categories'),
        specifications: joi_1.default.array().items(joi_1.default.string().hex().length(24)).label('Specifications'),
        specification_options: joi_1.default.array().items(joi_1.default.string().hex().length(24)).label('Specifications Options'),
        product_filter_tags: joi_1.default.array().items(joi_1.default.string().hex().length(24)).label('Product Filter Tags'),
        min_rate: joi_1.default.number().empty(0).label('Min Rate'),
        max_rate: joi_1.default.number().empty(0).label('Max Rate'),
        disc_perc: joi_1.default.number().empty(0).label('Disc Perc'),
        description: joi_1.default.string().empty("").label('Description'),
        meta_title: joi_1.default.string().empty("").max(100).label('Meta Title'),
        meta_desc: joi_1.default.string().empty("").max(200).label('Meta Description'),
        url_keyword: joi_1.default.string().empty("").label('URL Keyword'),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
// const validateBanner = (data: Request) => {
//   const schema = Joi.object({
//       collections: Joi.string().required().max(50).label('Collection Id'),
//   });
//   return schema.validate(data, { abortEarly: false, allowUnknown: true });
// };
const collectionView = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    collection = yield collection.populate("categories", { name: 1 });
    collection = yield collection.populate("banner", { name: 1, image: 1, image_height_ratio: 1, link: 1, position: 1, status: 1 });
    collection = yield collection.populate("specifications", { name: 1, type: 1, is_variant: 1, options: 1 });
    // collection = await collection.populate("product_filter_tags", { name: 1 });
    collection = lodash_1.default.pick(collection, ["_id", "name", "categories", "specifications", "specification_options", "product_filter_tags", "min_rate", "max_rate", "disc_perc", "banner", "description", "meta_title", "meta_desc", "url_keyword", "cid"]);
    collection.specifications = collection.specifications.map((el) => {
        el = lodash_1.default.pick(el, ["_id", "name", "type", "is_variant", "options"]);
        el.type = { _id: el.type, name: specifications_1.typeArray[el.type] };
        return el;
    });
    return collection;
});
const collectionsBannerView = (banner) => __awaiter(void 0, void 0, void 0, function* () {
    banner = banner.map((el) => {
        el = lodash_1.default.pick(el, ["_id", "image", "image_height_ratio", "link", "position", "status"]);
        // el = _.pick(el, [  "status"]);
        el.status = { _id: el.status, name: collections_2.statusArray[el.status] };
        return el;
    });
    return banner;
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let skipNumber = req.body.skip_number ? req.body.skip_number : 1;
    let recordPerPage = req.body.record_per_page ? req.body.record_per_page : 5;
    let sortBy = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType = req.body.sort_type ? req.body.sort_type : -1;
    let allowSortBy = ["name"];
    sortBy = allowSortBy.includes(sortBy) ? sortBy : "_id";
    let sort = {};
    sort[sortBy] = sortType;
    let skip = (skipNumber - 1) * recordPerPage;
    let limit = recordPerPage;
    let filter = new Object();
    if (req.body.name)
        filter["name"] = new RegExp(req.body.name, "i");
    let result = {};
    if (skipNumber == 1) {
        let totalRecords = yield collections_1.Collections.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
    result.data = yield collections_1.Collections.find({ $and: [filter] }).select({ name: 1 }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json(result);
});
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let collection = new collections_1.Collections(lodash_1.default.pick(req.body, ["name", "categories", "specifications", "specification_options", "product_filter_tags", "min_rate", "max_rate", "disc_perc", "description", "meta_title", "meta_desc", "url_keyword"]));
    let lastCid = yield collections_1.Collections.findOne().sort({ cid: -1 });
    collection.cid = lastCid ? lastCid.cid + 1 : 1;
    collection = yield collection.save();
    collection = yield collectionView(collection);
    collection = collection;
    res.status(200).json({ message: "The record has saved successfully.", data: collection });
});
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let collection = yield collections_1.Collections.findOne({ _id: req.body._id });
    if (!collection)
        return res.status(404).json({ message: "No record found." });
    collection = yield collectionView(collection);
    res.status(200).json({ message: "The reacord has fetch successfully.", data: collection });
});
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = validate(req.body);
    if (error)
        throw error;
    let collection = yield collections_1.Collections.findOne({ _id: req.body._id });
    if (!collection)
        res.status(404).json({ message: "No record found." });
    collection = lodash_1.default.assign(collection, lodash_1.default.pick(req.body, ["name", "categories", "specifications", "specification_options", "product_filter_tags", "min_rate", "max_rate", "disc_perc", "description", "meta_title", "meta_desc", "url_keyword"]));
    collection = yield collection.save();
    collection = yield collectionView(collection);
    res.status(200).json({ message: "The record has updated successfully.", data: collection });
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let collection = yield collections_1.Collections.findOneAndRemove({ _id: req.body._id });
    if (!collection)
        return res.status(404).json({ message: "No recored found." });
    res.status(200).json({ message: "The record has deleted successfully." });
});
const bannerAdd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, upload_1.fileUpload)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(404).json({ message: err.message });
        let collections = yield collections_1.Collections.findOne({ _id: req.body.collections });
        if (!collections)
            return res.status(404).json({ message: "No record found." });
        let data = lodash_1.default.pick(req.body, ['collections', 'image', 'image_height_ratio', 'link']);
        collections.banner.unshift(data);
        collections = yield collections.save();
        res.status(200).json({ message: "The banner has saved successfully.", data: collections });
    }));
});
const bannerEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let collections = yield collections_1.Collections.findOne({ _id: req.body.collections });
    if (!collections)
        return res.status(404).json({ message: "No record found." });
    collections.banner = collections.banner.map((item) => {
        if (item._id == req.body._id) {
            item.image = item.image,
                item.image_height_ratio = item.image_height_ratio,
                item.link = req.body.link ? req.body.link : item.link,
                item.position = item.position,
                item.status = item.status;
        }
        return item;
    });
    collections = yield collections.save();
    let result = {};
    result._id = collections._id;
    let banner = collections.banner;
    result.banner = yield collectionsBannerView(banner);
    res.status(200).json({ message: "The banner has saved successfully.", data: result });
});
const bannerDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let collections = yield collections_1.Collections.findOne({ _id: req.body.collections });
    if (!collections)
        return res.status(404).json({ message: 'No record found.' });
    collections.banner = collections.banner.filter((item) => {
        if (item._id.toString() === req.body._id) {
            (0, upload_1.deleteImage)(item.image);
        }
        return item._id.toString() !== req.body._id;
    });
    collections = yield collections.save();
    res.status(200).json({ message: "The record has deleted successfully." });
});
// const bannerStatus = async (req: Request, res: Response) => {
//   const { error } = validateBanner(req.body);
//   if (error) throw error;
//   let collections: any = await Collections.findOne({ _id: req.body.collections });
//   if (!collections) return res.status(404).json({ message: "No recored found." });
//   collections.banner =  collections.banner.map((item: any) => {
//     if(item._id == req.body._id) {
//         item.image = item.image,
//         item.image_height_ratio = item.image_height_ratio,
//         item.link = req.body.link ? req.body.link : item.link,
//         item.position = item.position,
//         item.status = item.status
//     } 
//     return item;
//   }); 
//   collections = await collections.save();
//     let result: any = {};
//     result._id = collections._id;
//   let banner = collections.banner;       
//   banner.status = !banner.status;
//     result.banner = await collectionsBannerView(banner); 
//   // collections.updated_on = new Date().toISOString();
//   // collections = collections.save();
//   // let banner = collections.banner;        
//   // collections.banner = await collectionsBannerView(banner);  
//   res.status(200).json({ message: "The status has changed successfully.", data: result });
// };
exports.default = { index, add, view, edit, remove, bannerDelete, bannerAdd, bannerEdit };
//# sourceMappingURL=collection.js.map