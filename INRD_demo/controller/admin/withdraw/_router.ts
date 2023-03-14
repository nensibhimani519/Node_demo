import { Router } from "express";
import withdraw from "./withdraw";

const router: Router = Router();
router.post("/get_withdraw_request_list", withdraw.getWithdrawRequestList);
router.post("/get_withdraw_request_info", withdraw.getWithdrawRequestInfo);
router.post("/approve", withdraw.approveWithdrawRequest);
router.post("/reject", withdraw.rejectWithdrawRequest);

export default router;
