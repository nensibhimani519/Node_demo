import { Router } from "express";
import category from "./category";

const router: Router = Router();
router.post("/category", category.addCategory);

export default router;
