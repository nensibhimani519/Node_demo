import { Router } from "express";
import login from "./login";

const router: Router = Router();
router.post("/send_otp", login.sendOtp);
router.post("/verify_otp", login.verifyOtp);

export default router;
