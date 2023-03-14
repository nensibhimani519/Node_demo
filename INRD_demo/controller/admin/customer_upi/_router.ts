import { Router } from "express";
import customerUpi from "./customer_upi";

const router: Router = Router();
router.post("/get_upi_list", customerUpi.getUpiList);
router.post("/get_upi_info", customerUpi.getUpiInfo);

export default router;
