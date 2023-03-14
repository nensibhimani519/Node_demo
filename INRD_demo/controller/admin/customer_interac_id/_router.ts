import { Router } from "express";
import customerInteracId from "./customer_interac_id";

const router: Router = Router();
router.post("/get_interac_id_list", customerInteracId.getInteracIdList);
router.post("/get_interac_id_info", customerInteracId.getInteracIdInfo);

export default router;
