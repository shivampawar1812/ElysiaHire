const express = require("express");

const router = express.Router();

const {
  uploadResume,
  getResume,
  deleteResume,
} = require("../controllers/resumeController");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const upload = require(
  "../middleware/uploadMiddleware"
);


// UPLOAD RESUME
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);


// GET RESUME
router.get(
  "/",
  authMiddleware,
  getResume
);


// DELETE RESUME
router.delete(
  "/",
  authMiddleware,
  deleteResume
);


module.exports = router;