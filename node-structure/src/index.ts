import express, { Application } from "express";
import config from "config";
import db from "./startup/db";
import models from "./startup/models";
import routes from "./startup/routes";
import errorHandler from "./startup/error";

const app: Application = express();

db();
models();
routes(app);
errorHandler();

const port: number = config.get("port") || 5000;
app.listen(port, () => console.log(`connnected on port ${port}`));
