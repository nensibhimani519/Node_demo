const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");
const productsController = require("../controllers/products");

const router = express.Router();

// const products = [];

// get request
router.get(
  "/add-product",
  productsController.getAddProduct
  // (req, res, next) => {
  //   console.log("In the middleware !!");
  // next() => allow to next middleware request
  // next()
  //   res.send(
  //     '<form action="/admin/product" method="POST"><input type="text" name="title" /><button type="submit">Add Product</button></form>'
  //   );
  //   res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  //   res.sendFile(path.join(rootDir, "views", "add-product.html"));

  //   res.render("add-product", {
  //     pageTitle: "Add Product",
  //     path: "/admin/add-product",
  //     formsCSS: true,
  //     productCSS: true,
  //     activeAddProduct: true,
  //   });
  // }
);

// post request
router.post("/add-product", productsController.postAddProduct);

module.exports = router;

// exports.routes = router;
// exports.products = products;
