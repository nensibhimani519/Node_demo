import express, { Request, Response } from "express";
import { router } from "./routes/routes";

const app = express();
const PORT = 8080;

app.use("/", router);

app.get("/test", (req: Request, res: Response): void => {
  res.json({ data: "test page 123" });
});

app.listen(PORT, (): void => {
  console.log("Server is Running ");
});
