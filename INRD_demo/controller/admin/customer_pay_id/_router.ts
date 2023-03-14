import { Router } from "express";
import customerPayId from "./customer_pay_id";

const router: Router = Router();
router.post("/get_pay_id_list", customerPayId.getPayIdList);
router.post("/get_pay_id_info", customerPayId.getPayIdInfo);

export default router;
