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
const wishlist_1 = require("../../models/validation/wishlist");
const wishlistList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalItems = yield wishlist_1.Wishlist.find().countDocuments();
    const wishlists = yield wishlist_1.Wishlist.find();
    res.status(200).json({
        message: "wishlist get Sucessfully!",
        totalRecords: totalItems,
        data: wishlists,
    });
});
const getWishlistProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = req.body.page || 1;
    let limit = req.body.limit || 10;
    const wishlists = yield wishlist_1.Wishlist.find()
        .skip((page - 1) * limit)
        .limit();
    res.status(200).json({
        message: "get Sucessfully!",
        data: wishlists,
    });
});
const addWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, wishlist_1.validate)(req.body);
    if (error)
        throw error;
    let uniqueName = yield wishlist_1.Wishlist.findOne({
        wishlist_name: req.body.wishlist_name,
    });
    if (uniqueName)
        return res.status(400).json({ message: "Wishlist name already Exist." });
    let wishlist = new wishlist_1.Wishlist(lodash_1.default.pick(req.body, ["wishlist_name", "products", "userId"]));
    const wishlist_data = yield wishlist.save();
    res.status(200).json({
        message: "wishlist add Sucessfully!",
        data: wishlist_data,
    });
});
const editWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, wishlist_1.validate)(req.body);
    if (error)
        throw error;
    const existingWishlist = yield wishlist_1.Wishlist.findOne({
        _id: req.body._id,
    });
    if (!existingWishlist) {
        return res.status(404).json({ message: "No record found." });
    }
    const wishlist = lodash_1.default.assign(existingWishlist, lodash_1.default.pick(req.body, ["whislist_name", "products"]));
    wishlist.updated_on = new Date().toISOString();
    wishlist.save();
    return res.status(200).json({
        message: "The record has updated successfully.",
        data: wishlist,
    });
});
const deleteWishlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let wishlist = yield wishlist_1.Wishlist.findOneAndRemove({ _id: req.body._id });
    if (!wishlist) {
        return res.status(404).json({ message: "Wishlist Not Found!" });
    }
    return res.status(200).json({ message: "Wishlist Deleted successfully!!" });
});
exports.default = {
    wishlistList,
    getWishlistProduct,
    addWishlist,
    editWishlist,
    deleteWishlist,
};
//# sourceMappingURL=wishlist.js.map