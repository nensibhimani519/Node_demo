import express, { Application } from "express";

import adminSystemRouter from "./admin/system/_router";
import categoryRouter from "./category/_router";

const app: Application = express();
app.use("/app/system", adminSystemRouter);
app.use("/category", categoryRouter);

export default app;
