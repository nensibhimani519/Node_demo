import { Router } from "express";
import category from "./category";

const router: Router = Router();

router.get("/", category.categoryList);
router.post("/category", category.addCategory);
router.delete("/view", category.getByIdCategory);
router.delete("/delete", category.deleteCategory);

export default router;
