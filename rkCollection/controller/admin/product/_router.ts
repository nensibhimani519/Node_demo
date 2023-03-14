import { Router } from "express";
import specification from './specification'

const router: Router = Router();
router.post("/specification", specification.index);
router.post("/specification/add", specification.add);
router.post("/specification/view", specification.view);
router.post("/specification/edit", specification.edit);
router.post("/specification/delete", specification.remove);
router.post("/specification/status", specification.status);

export default router;
