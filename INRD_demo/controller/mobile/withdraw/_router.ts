import { Router } from "express";
import withdraw from './withdraw';

const router: Router = Router();
router.post("/get_currency_list", withdraw.getCurrencyList);
router.post("/add_withdraw_request", withdraw.addWithdrawRequest);
router.post("/get_withdraw_request_list", withdraw.getWithdrawRequestList);

export default router;
