"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const collections_1 = require("../models/collections");
const category_1 = require("../models/category");
const product_code_category_1 = require("../models/product_code_category");
const specifications_1 = require("../models/specifications");
exports.default = () => {
    (0, mongoose_1.model)("Collections", collections_1.collectionSchema);
    (0, mongoose_1.model)("Category", category_1.categorySchema);
    (0, mongoose_1.model)("ProductCodeCategory", product_code_category_1.productCodeCategorySchema);
    (0, mongoose_1.model)("Specifications", specifications_1.specificationsSchema);
};
//# sourceMappingURL=model.js.map