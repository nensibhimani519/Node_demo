"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const category_1 = require("../models/schema/category");
const product_1 = require("../models/schema/product");
const customer_1 = require("../models/schema/customer");
exports.default = () => {
    (0, mongoose_1.model)("Category", category_1.categorySchema);
    (0, mongoose_1.model)("Product", product_1.productSchema);
    (0, mongoose_1.model)("Customer", customer_1.customerSchema);
};
//# sourceMappingURL=models.js.map