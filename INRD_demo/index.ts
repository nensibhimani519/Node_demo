import express from "express";
import db from "./startup/db";
import connectModel from "./startup/model";
import router from "./startup/routes";
import config from "./config/default.json";
import errorHandler from "./startup/error";

const app = express();

db();
connectModel();
router(app);
errorHandler();

const port: number = (process.env.PORT || config.port) as number;
app.listen(port, () => console.log(`connnected on port ${port}`));

export default app;
