import express from "express";
import mongoose from "mongoose";
import db from "./startup/db.js";
import error from "./startup/error.js";
import connectModel from "./startup/model.js";
import routes from "./startup/routes.js";

const app = express();

db();
error();
connectModel();
routes(app);

const port = 8000;
app.listen(port, () => console.log(`connnected on port ${port}`));

// app.listen(8000, () => {
//   console.log("connected");
// });

export default app;
