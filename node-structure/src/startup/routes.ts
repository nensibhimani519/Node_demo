import cors from "cors";
import { Application, json, Request, Response } from "express";
import helmet from 'helmet';
import router from "../controllers/_router";

export default (app: Application) => {
    app.use(helmet());
    app.use(cors());
    app.use(json());
    app.use("/", router);
    app.use((req: Request, res: Response) => {
        res.status(404).json({ message: 'Url Not Found' });
    })
}