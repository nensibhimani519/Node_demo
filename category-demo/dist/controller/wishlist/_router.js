"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_1 = __importDefault(require("./wishlist"));
const router = (0, express_1.Router)();
router.get("/", wishlist_1.default.wishlistList);
router.post("/add", wishlist_1.default.addWishlist);
router.post("/getWishlistProject", wishlist_1.default.getWishlistProduct);
router.post("/edit", wishlist_1.default.editWishlist);
router.delete("/delete", wishlist_1.default.deleteWishlist);
exports.default = router;
//# sourceMappingURL=_router.js.map