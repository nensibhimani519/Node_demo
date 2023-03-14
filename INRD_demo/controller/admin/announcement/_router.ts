import { Router } from "express";
import announcement from "./announcement";

const router: Router = Router();
router.post("/get_announcement_list", announcement.getAnnouncementList);
router.post("/get_announcement_info", announcement.getAnnouncementInfo);
router.post("/add_announcement", announcement.addAnnouncement);
router.post("/update_announcement", announcement.updateAnnouncement);
router.post("/change_status", announcement.changeStatus);
router.post("/delete_announcement", announcement.deleteAnnouncement);

export default router;
