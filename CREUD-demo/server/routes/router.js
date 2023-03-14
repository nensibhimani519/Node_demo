const express = require("express");
const route = express();

route.get("/", (req, res) => {
  res.render("index");
  //   res.send("Crud Application");
});

route.get("/add-user", (req, res) => {
  res.render("add-user");
});

route.get("/update-user", (req, res) => {
  res.render("update_user");
});

module.exports = route;
