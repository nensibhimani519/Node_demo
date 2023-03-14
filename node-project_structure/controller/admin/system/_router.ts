import { Router } from "express";

import User from "./user";

const router: Router = Router();
router.post("/user", User.index);

export default router;
