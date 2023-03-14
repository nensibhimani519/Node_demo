import { Router } from "express";
import notification from './notification';

const router: Router = Router();
router.post("/get_announcement_list", notification.getAnnouncementList);
router.post("/get_unread_count", notification.getUnreadCount);

export default router;
