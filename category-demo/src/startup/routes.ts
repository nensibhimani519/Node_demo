import { Application, Request, Response, json } from "express";
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from "../middleware/error";
import router from "../controller/_router";

export default (app: Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(json());
  app.use("/", router);
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Url Not Found" });
  });

  app.use(errorHandler);
};
