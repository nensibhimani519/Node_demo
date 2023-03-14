import { Router } from "express";

import User from "./user.js";

const router = Router();
router.post("/user", User.index);

export default router;
