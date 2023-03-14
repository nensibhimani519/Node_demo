import express from "express";
import adminSystemRouter from '../controller/admin/system/_router'
import adminProductRouter from '../controller/admin/product/_router'

const app = express();

app.use("/app/system", adminSystemRouter)
app.use("/product", adminProductRouter)

export default app;