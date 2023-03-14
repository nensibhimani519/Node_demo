"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const _router_1 = __importDefault(require("./mobile/login/_router"));
const _router_2 = __importDefault(require("./mobile/withdraw/_router"));
const _router_3 = __importDefault(require("./mobile/settings/_router"));
const _router_4 = __importDefault(require("./mobile/notification/_router"));
const _router_5 = __importDefault(require("./mobile/device_token/_router"));
// admin routes
const _router_6 = __importDefault(require("./admin/announcement/_router"));
const _router_7 = __importDefault(require("./admin/company/_router"));
const _router_8 = __importDefault(require("./admin/customer_bank/_router"));
const _router_9 = __importDefault(require("./admin/customer_interac_id/_router"));
const _router_10 = __importDefault(require("./admin/customer_pay_id/_router"));
const _router_11 = __importDefault(require("./admin/customer_upi/_router"));
const _router_12 = __importDefault(require("./admin/promotion/_router"));
const _router_13 = __importDefault(require("./admin/withdraw/_router"));
const app = (0, express_1.default)();
app.use("/mobile/login", _router_1.default);
app.use("/mobile/settings", auth_1.mobileAuth, _router_3.default);
app.use("/mobile/withdraw", auth_1.mobileAuth, _router_2.default);
app.use("/mobile/notification", auth_1.mobileAuth, _router_4.default);
app.use("/mobile/device_token", auth_1.mobileAuth, _router_5.default);
// admin routes
app.use("/admin/announcement", _router_6.default);
app.use("/admin/company", _router_7.default);
app.use("/admin/customer_bank", _router_8.default);
app.use("/admin/customer_interac_id", _router_9.default);
app.use("/admin/customer_pay_id", _router_10.default);
app.use("/admin/customer_upi", _router_11.default);
app.use("/admin/promotion", _router_12.default);
app.use("/admin/withdraw", _router_13.default);
exports.default = app;
//# sourceMappingURL=_router.js.map