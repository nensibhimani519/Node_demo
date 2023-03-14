"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const announcement_1 = __importDefault(require("./announcement"));
const router = (0, express_1.Router)();
router.post("/get_announcement_list", announcement_1.default.getAnnouncementList);
router.post("/get_announcement_info", announcement_1.default.getAnnouncementInfo);
router.post("/add_announcement", announcement_1.default.addAnnouncement);
router.post("/update_announcement", announcement_1.default.updateAnnouncement);
router.post("/change_status", announcement_1.default.changeStatus);
router.post("/delete_announcement", announcement_1.default.deleteAnnouncement);
exports.default = router;
//# sourceMappingURL=_router.js.map