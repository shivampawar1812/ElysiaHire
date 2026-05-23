const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const {
    uploadResume,
    getResumeById,
    getUserResumes
}= require("../controllers/resumeController.js");

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);

router.get("/resume/:id", getResumeById);

router.get("/user/resumes", getUserResumes);

module.exports = router;