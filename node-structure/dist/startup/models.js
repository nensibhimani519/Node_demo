"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const category_1 = require("../models/schema/category");
const customer_1 = require("../models/schema/customer");
const product_1 = require("../models/schema/product");
const user_1 = require("../models/schema/user");
exports.default = () => {
    (0, mongoose_1.model)("Users", user_1.userSchema),
        (0, mongoose_1.model)("Customer", customer_1.customerSchema),
        (0, mongoose_1.model)("Product", product_1.productSchema),
        (0, mongoose_1.model)("Category", category_1.categorySchema);
};
