const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const productsController = require("../controllers/products");

const router = express.Router();

router.get(
  "/",
  productsController.getProducts
  // res.send('<h1>Hello from express !! </h1>')
  //   res.sendFile(path.join(__dirname, "../", "views", "shop.html"));

  //   console.log(adminData.products, " products");
  //   res.sendFile(path.join(rootDir, "views", "shop.html"));
);

module.exports = router;
