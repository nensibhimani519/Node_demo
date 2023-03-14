"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_1 = __importDefault(require("./company"));
const router = (0, express_1.Router)();
router.post("/get_social_media_links", company_1.default.getSocialMediaLinks);
router.post("/update_social_media_links", company_1.default.updateSocialMediaLinks);
router.post("/add_social_links", company_1.default.addSocialLinks);
exports.default = router;
//# sourceMappingURL=_router.js.map