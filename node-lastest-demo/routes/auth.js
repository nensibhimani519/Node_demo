const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.post("/logout", authController.postLogout);

router.get("/resetpassword", authController.getResetpassword);
router.post("/resetpassword", authController.postResetpassword);

// new-password route
router.get("/resetpassword/:token", authController.getNewpassword);
router.post("/new-password", authController.postNewpassword);

module.exports = router;
