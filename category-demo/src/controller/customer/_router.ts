import { Router } from "express";
import customer from "./customer";

const router: Router = Router();

router.get("/", customer.customerList);
router.post("/add", customer.addCustomer);

export default router;
