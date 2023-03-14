import express, { Request, Response } from "express";
import { homeDetail } from "../controller/users";
const router = express.Router();

router.get("/home", homeDetail);

router.get("/about", (req: Request, res: Response): void => {
  res.json({
    message: "About Page",
  });
});

export { router };
