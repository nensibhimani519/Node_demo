import { Router } from "express";
import devicetoken from "./device_token";

const router: Router = Router();
router.post("/add_fcm_token", devicetoken.addFcmToken);

export default router;
