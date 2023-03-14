import express from "express";
import adminAuth from "./admin/auth/_router";
import adminCategory from "./admin/category/_router";

const app = express();

app.use("/admin/auth", adminAuth);
app.use("/admin/category", adminCategory);

export default app;
