import { Router } from "express";
import promotion from "./promotion";

const router: Router = Router();
router.post("/get_promotion_list", promotion.getPromotionList);
router.post("/get_promotion_info", promotion.getPromotionInfo);
router.post("/add_promotion", promotion.addPromotion);
router.post("/update_promotion", promotion.updatePromotion);
router.post("/change_status", promotion.changeStatus);
router.post("/delete_promotion", promotion.deletePromotion);

export default router;
