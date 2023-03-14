const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // cookie example
  // const isLoggedIn = req.get("Cookie").split("=")[1] === true;

  // session example
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    // isAuthenticated: isLoggedIn,
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // cookie example
  // req.isLoggedIn = true;
  // res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");

  // session example
  User.findById("63a947d006981d45314d54cd")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      // res.redirect("/");
      req.session.save((err) => {
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
