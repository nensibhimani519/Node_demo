import express from "express";
import adminCategory from "./category/_router";
import adminProduct from "./product/_router";
import adminCustomer from "./customer/_router";
import adminWishlist from "./wishlist/_router";
import adminOrder from "./order/_router";

const app = express();

app.use("/category", adminCategory);
app.use("/product", adminProduct);
app.use("/customer", adminCustomer);
app.use("/wishlist", adminWishlist);
app.use("/order", adminOrder);

export default app;
