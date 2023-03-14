import { Application, json, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "../middleware/error";
import router from "../controller/_router";

export default (app: Application) => {
  app.use(helmet());
  app.use(json());
  app.use(cors());

  // token or not
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Expose-Headers", "x-auth-token");
    next();
  });

  // define all routes
  app.use("/", router);

  // error handling like url
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "URL not found." });
  });

  app.use(errorHandler);
};
