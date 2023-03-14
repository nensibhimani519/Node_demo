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
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/validation/order");
const prod_1 = require("../../models/validation/prod");
const prodList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalItems = yield prod_1.Prod.find().countDocuments();
    const prod = yield prod_1.Prod.find({});
    res.status(200).json({
        message: "product get Sucessfully!",
        totalRecords: totalItems,
        data: prod,
    });
});
const orderList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalItems = yield order_1.Order.find().countDocuments();
    const order = yield order_1.Order.find({});
    res.status(200).json({
        message: "order get Sucessfully!",
        totalRecords: totalItems,
        data: order,
    });
});
const orderInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let order = yield order_1.Order.find({});
    let prod = yield prod_1.Prod.find({});
    let completedArr = [];
    let cancelArr = [];
    for (let i = 0; i < prod.length; i++) {
        let pCode = yield order_1.Order.find({ p_code: prod[i].p_code }).lean();
        for (let j = 0; j < pCode.length; j++) {
            if (prod[i].stock >= pCode[j].qty) {
                prod[i].stock -= pCode[j].qty;
                completedArr.push(pCode[j]._id);
            }
            else {
                cancelArr.push(pCode[j]._id);
            }
        }
        yield order_1.Order.updateMany({
            p_code: prod[i].p_code,
        }, [
            {
                $set: {
                    status: {
                        $cond: {
                            if: { $in: ["$_id", completedArr] },
                            then: "Completed",
                            else: "Cancel",
                        },
                    },
                },
            },
        ]);
        yield prod_1.Prod.updateOne({ _id: prod[i]._id }, {
            $set: {
                stock: prod[i].stock,
            },
        });
    }
    res.status(200).json({
        message: "order get Sucessfully!",
        // totalRecords: totalItems,
        order_data: order,
        prod_data: prod,
    });
});
exports.default = { prodList, orderList, orderInventory };
//# sourceMappingURL=order.js.map