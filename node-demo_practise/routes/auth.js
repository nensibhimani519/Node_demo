const express = require("express");
// validation example
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail(),

    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.get("/signup", authController.getSignup);
router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter valid email.")
      .custom((value, { req }) => {
        // if (value === "admin@gmail.com") {
        //   throw new Error("This Email address if forbidden.");
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exists already, please pick a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only number & text & at least 5 characters."
    )
      .isLength({ min: 5 })
      //   .withMessage(
      //     "Plese enter a password with only number & text & at least 5 characters."
      //   )
      .isAlphanumeric()
      .trim(),
    body("confirm_password")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password is not match!!");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/resetpassword", authController.getResetpassword);
router.post("/resetpassword", authController.postResetpassword);

// new-password route
router.get("/resetpassword/:token", authController.getNewpassword);
router.post("/new-password", authController.postNewpassword);

module.exports = router;
