import { Router } from "express";
import collection from './collection'

const router: Router = Router();
router.post("/colletions", collection.index);
router.post("/colletions/add", collection.add);
router.post("/colletions/view", collection.view);
router.post("/colletions/edit", collection.edit);
router.post("/colletions/delete", collection.remove);

// banner Api
router.post("/colletions/banner/add",collection.bannerAdd);
router.post("/colletions/banner/edit", collection.bannerEdit);
router.post("/colletions/banner/delete", collection.bannerDelete);
// router.post("/colletions/banner/status", collection.bannerStatus);


export default router;
