"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promotion_1 = __importDefault(require("./promotion"));
const router = (0, express_1.Router)();
router.post("/get_promotion_list", promotion_1.default.getPromotionList);
router.post("/get_promotion_info", promotion_1.default.getPromotionInfo);
router.post("/add_promotion", promotion_1.default.addPromotion);
router.post("/update_promotion", promotion_1.default.updatePromotion);
router.post("/change_status", promotion_1.default.changeStatus);
router.post("/delete_promotion", promotion_1.default.deletePromotion);
exports.default = router;
//# sourceMappingURL=_router.js.map