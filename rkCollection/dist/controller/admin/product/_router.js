"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specification_1 = __importDefault(require("./specification"));
const router = (0, express_1.Router)();
router.post("/specification", specification_1.default.index);
router.post("/specification/add", specification_1.default.add);
router.post("/specification/view", specification_1.default.view);
router.post("/specification/edit", specification_1.default.edit);
router.post("/specification/delete", specification_1.default.remove);
router.post("/specification/status", specification_1.default.status);
exports.default = router;
//# sourceMappingURL=_router.js.map