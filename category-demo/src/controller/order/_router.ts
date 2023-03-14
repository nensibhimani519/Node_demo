import { Router } from "express";
import order from "./order";

const router: Router = Router();

router.get("/", order.orderList);
router.get("/prod", order.prodList);
router.get("/order_inventory", order.orderInventory);
// router.post("/order", order.addorder);
// router.delete("/view", order.getByIdorder);
// router.delete("/delete", order.deleteorder);

export default router;
