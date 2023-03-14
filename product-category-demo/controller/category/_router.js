import { Router } from "express";
import category from "./category.js";

const router = Router();
router.post("/category", category.addCategory);

export default router;
