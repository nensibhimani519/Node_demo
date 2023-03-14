import { Router } from "express";
import company from "./company";

const router: Router = Router();
router.post("/get_social_media_links", company.getSocialMediaLinks);
router.post("/update_social_media_links", company.updateSocialMediaLinks);
router.post("/add_social_links", company.addSocialLinks);

export default router;
