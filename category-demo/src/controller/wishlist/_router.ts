import { Router } from "express";
import wishlist from "./wishlist";

const router: Router = Router();

router.get("/", wishlist.wishlistList);
router.post("/add", wishlist.addWishlist);
router.post("/getWishlistProject", wishlist.getWishlistProduct);
router.post("/edit", wishlist.editWishlist);
router.delete("/delete", wishlist.deleteWishlist);

export default router;
