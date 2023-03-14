import { Router } from "express";
import Auth from "./auth";

const router: Router = Router();

router.post("/", Auth.index);

export default router;