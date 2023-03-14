import { Router } from "express";
import settings from './settings';

const router: Router = Router();
router.post("/check_pin", settings.checkPin);
router.post("/update_pin", settings.updatePin);
router.post("/add_bank", settings.addBank);
router.post("/add_interac_id", settings.addInteracID);
router.post("/add_pay_id", settings.addPayID);
router.post("/add_upi_id", settings.addUpiID);
router.post("/get_bank_list", settings.getBankList);
router.post("/get_interac_id_list", settings.getInteracIdList);
router.post("/get_pay_id_list", settings.getPayIdList);
router.post("/get_upi_id_list", settings.getUpiIdList);
router.post("/update_bank", settings.editBank);
router.post("/update_interac_id", settings.editInteracId);
router.post("/update_pay_id", settings.editPayId);
router.post("/update_upi_id", settings.editUpiId);
router.post("/upload_proof", settings.uploadProof);
router.post("/remove_proof", settings.removeProof);
router.post("/update_profile", settings.updateProfile);
router.post("/get_profile", settings.getProfile);
router.post("/get_country_list", settings.getCountryList);

export default router;
