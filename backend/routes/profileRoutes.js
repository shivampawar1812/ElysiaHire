const express = require("express");

const router = express.Router();

const {
  updateProfile,
  getProfile,
} = require(
  "../controllers/profileController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);


// UPDATE PROFILE
router.put(
  "/",
  authMiddleware,
  updateProfile
);


// GET PROFILE
router.get(
  "/",
  authMiddleware,
  getProfile
);


module.exports = router;