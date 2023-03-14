import express, { Application } from "express";
import db from "./startup/db";
import models from "./startup/models";
import routes from "./startup/routes";
import errorHandler from "./startup/error";
import config from "config";

// "dbUrl": "mongodb://localhost:27017/category-demo"

const app: Application = express();

db();
models();
routes(app);
errorHandler();

const port: number = config.get("port") || 5000;
app.listen(port, () => console.log(`connnected on port ${port}`));
