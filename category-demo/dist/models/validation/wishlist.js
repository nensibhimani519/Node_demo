"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = exports.validate = void 0;
const mongoose_1 = require("mongoose");
const joi_1 = __importDefault(require("joi"));
const wishlist_1 = require("../schema/wishlist");
const Wishlist = (0, mongoose_1.model)("Wishlist", wishlist_1.wishlistSchema);
exports.Wishlist = Wishlist;
const validate = (data) => {
    const schema = joi_1.default.object({
        wishlist_name: joi_1.default.string()
            .required()
            .max(50)
            .min(3)
            .label("Wishlist Name"),
        products: joi_1.default.array()
            .items(joi_1.default.string().hex().length(24).required())
            .label("ProdutId"),
        userId: joi_1.default.string().hex().length(24).required().label("UserId"),
    });
    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};
exports.validate = validate;
//# sourceMappingURL=wishlist.js.map