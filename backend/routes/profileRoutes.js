const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const uploadProfilePhoto =
require("../middleware/profileUpload");


const {

  updateProfile,

  getProfile,

  uploadProfilePhoto:
  uploadProfilePhotoController,

} = require(
  "../controllers/profileController"
);


// UPDATE PROFILE
router.put(
  "/update",
  authMiddleware,
  updateProfile
);


// GET PROFILE
router.get(
  "/",
  authMiddleware,
  getProfile
);


// UPLOAD PROFILE PHOTO
router.post(

  "/upload-photo",

  authMiddleware,

  uploadProfilePhoto.single(
    "profilePhoto"
  ),

  uploadProfilePhotoController
);


module.exports = router;