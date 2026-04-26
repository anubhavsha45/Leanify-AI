const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");

router.route("/register").post(authController.registerUser);

router.route("/login").post(authController.loginUser);

const userController = require("./../controllers/userController");
const upload = require("../utils/upload");

router.patch(
  "/updateMe",
  authController.protect,
  upload.single("photo"),
  userController.updateMe,
);

module.exports = router;
