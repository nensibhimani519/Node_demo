import { Router } from "express";
import Category from "./category";

const router: Router = Router();

router.post("/", Category.index);
router.post("/add", Category.add);
router.post("/view", Category.view);
router.post("/edit", Category.edit);
router.post("/remove", Category.remove);
router.post("/status", Category.status);

export default router;
