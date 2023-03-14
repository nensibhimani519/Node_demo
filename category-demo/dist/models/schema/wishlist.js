"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistSchema = void 0;
const mongoose_1 = require("mongoose");
exports.wishlistSchema = new mongoose_1.Schema({
    wishlist_name: {
        type: String,
        required: true,
        // unique: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        reuired: [true, "User Id is required."],
        ref: "User",
    },
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    created_on: { type: Date, default: new Date().toISOString() },
    updated_on: { type: Date, default: new Date().toISOString() },
}, { collection: "wishlist" });
//# sourceMappingURL=wishlist.js.map