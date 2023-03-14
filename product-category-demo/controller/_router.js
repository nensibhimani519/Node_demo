import express from "express";

import adminSystemRouter from "./admin/system/_router.js";
import categoryRouter from "./category/_router.js";

const app = express();
app.use("/app/system", adminSystemRouter);
app.use("/category", categoryRouter);

export default app;
