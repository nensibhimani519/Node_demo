"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Category name is required."],
        unique: true,
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
}, { collection: "category" });
//# sourceMappingURL=category.js.map