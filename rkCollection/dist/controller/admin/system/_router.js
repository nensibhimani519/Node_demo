"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collection_1 = __importDefault(require("./collection"));
const router = (0, express_1.Router)();
router.post("/colletions", collection_1.default.index);
router.post("/colletions/add", collection_1.default.add);
router.post("/colletions/view", collection_1.default.view);
router.post("/colletions/edit", collection_1.default.edit);
router.post("/colletions/delete", collection_1.default.remove);
// banner Api
router.post("/colletions/banner/add", collection_1.default.bannerAdd);
router.post("/colletions/banner/edit", collection_1.default.bannerEdit);
router.post("/colletions/banner/delete", collection_1.default.bannerDelete);
// router.post("/colletions/banner/status", collection.bannerStatus);
exports.default = router;
//# sourceMappingURL=_router.js.map