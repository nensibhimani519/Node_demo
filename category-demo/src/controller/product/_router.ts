import { Router } from "express";
import product from "./product";

const router: Router = Router();

router.get("/", product.productList);
router.post("/add", product.addProduct);
router.post("/edit", product.editProduct);
router.post("/delete", product.deleteProduct);

export default router;
