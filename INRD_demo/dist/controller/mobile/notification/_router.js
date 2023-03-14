"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_1 = __importDefault(require("./notification"));
const router = (0, express_1.Router)();
router.post("/get_announcement_list", notification_1.default.getAnnouncementList);
router.post("/get_unread_count", notification_1.default.getUnreadCount);
exports.default = router;
//# sourceMappingURL=_router.js.map