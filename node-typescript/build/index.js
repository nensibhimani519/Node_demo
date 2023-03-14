"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const app = (0, express_1.default)();
const PORT = 8080;
app.use("/", routes_1.router);
app.get("/test", (req, res) => {
    res.json({ data: "test page 123" });
});
app.listen(PORT, () => {
    console.log("Server is Running ");
});
