const express = require("express");

const {
  registerUser,
  loginUser,
  verifyOTP,
  sendResetOtp,
  verifyResetOtp,
  resetPassword,
  logoutUser
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify-otp", verifyOTP);

router.post("/send-reset-otp", sendResetOtp);

router.post("/verify-reset-otp", verifyResetOtp);

router.post("/reset-password", resetPassword);

router.post("/logout", logoutUser);

module.exports = router;
