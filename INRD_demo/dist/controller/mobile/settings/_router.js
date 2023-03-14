"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_1 = __importDefault(require("./settings"));
const router = (0, express_1.Router)();
router.post("/check_pin", settings_1.default.checkPin);
router.post("/update_pin", settings_1.default.updatePin);
router.post("/add_bank", settings_1.default.addBank);
router.post("/add_interac_id", settings_1.default.addInteracID);
router.post("/add_pay_id", settings_1.default.addPayID);
router.post("/add_upi_id", settings_1.default.addUpiID);
router.post("/get_bank_list", settings_1.default.getBankList);
router.post("/get_interac_id_list", settings_1.default.getInteracIdList);
router.post("/get_pay_id_list", settings_1.default.getPayIdList);
router.post("/get_upi_id_list", settings_1.default.getUpiIdList);
router.post("/update_bank", settings_1.default.editBank);
router.post("/update_interac_id", settings_1.default.editInteracId);
router.post("/update_pay_id", settings_1.default.editPayId);
router.post("/update_upi_id", settings_1.default.editUpiId);
router.post("/upload_proof", settings_1.default.uploadProof);
router.post("/remove_proof", settings_1.default.removeProof);
router.post("/update_profile", settings_1.default.updateProfile);
router.post("/get_profile", settings_1.default.getProfile);
router.post("/get_country_list", settings_1.default.getCountryList);
exports.default = router;
//# sourceMappingURL=_router.js.map