import { Router } from "express";
import customerBank from "./customer_bank";

const router: Router = Router();
router.post("/get_bank_list", customerBank.getBankList);
router.post("/get_bank_info", customerBank.getBankInfo);

export default router;
