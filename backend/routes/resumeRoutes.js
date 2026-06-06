const express = require("express");

const router = express.Router();

const {
  uploadResume,
  getResume,
  getResumeVersions,
  deleteResume,
  getLatestAnalysis,
  getAnalysisHistory,
  getAnalysisById,
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

//GET RESUME VERSIONS
router.get(
   "/versions",
   authMiddleware,
   getResumeVersions
);

// RESUME ANALYSIS
router.get(
  "/latest-analysis",
  authMiddleware,
  getLatestAnalysis
);

// RESUME HISTORY
router.get(
  "/resume-history",
  authMiddleware,
  getAnalysisHistory
)

// RESUME BY ID
router.get(
  "/analysis/:resumeId",
  authMiddleware,
  getAnalysisById
)

// DELETE RESUME
router.delete(
  "/:resumeId",
  authMiddleware,
  deleteResume
);




module.exports = router;