const Resume = require("../models/Resume");

const { parseResume, } = require("../services/resumeParserService");

const { analyzeResume } = require("../services/aiResumeService");

const imagekit = require("../config/imagekit");

// ======================================
// UPLOAD RESUME
// ======================================

const uploadResume =
  async (req, res) => {

    try {

      console.log(req.file);

      // CHECK FILE

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message:
            "Resume file is required",
        });
      }

      // UPLOAD TO IMAGEKIT

      // PARSE RESUME FIRST

      const parsedResume =
        await parseResume(
          req.file.buffer,
          req.file.originalname
        );

      console.log(parsedResume);

      // AI ANALYSIS

      const analysis =
        await analyzeResume(
          parsedResume.extractedData || ""
        );

      console.log("AI Analysis:");
      console.log(analysis);

      // UPLOAD NEW RESUME

      const uploadedResume =
        await imagekit.upload({

          file:
            req.file.buffer,

          fileName:
            `${Date.now()}-${req.file.originalname}`,

          folder:
            "/elysiahire/resumes",
        });

      const latestResume =
        await Resume.findOne({
          user: req.user.id,
        })
          .sort({
            versionNumber: -1,
          });

      const versionNumber =
        latestResume
          ? latestResume.versionNumber + 1
          : 1;

      const resume = await Resume.create({

        user: req.user.id,

        versionNumber,

        originalFileName:
          req.file.originalname,

        resumeUrl:
          uploadedResume.url,

        resumeFileId:
          uploadedResume.fileId,

        parsedText:
          parsedResume?.parsedText || "",

        aiAnalysis: {

          atsScore:
            analysis?.atsScore || 0,

          strengths:
            analysis?.strengths || [],

          weaknesses:
            analysis?.weaknesses || [],

          missingSkills:
            analysis?.missingSkills || [],

          suggestions:
            analysis?.suggestions || [],

          recommendedRoles:
            analysis?.recommendedRoles || [],
        },

        extractedData: {

          name:
            parsedResume?.extractedData?.name || "",

          email:
            parsedResume?.extractedData?.email || "",

          phone:
            parsedResume?.extractedData?.phone || "",

          github:
            parsedResume?.extractedData?.github || "",

          linkedin:
            parsedResume?.extractedData?.linkedin || "",

          skills:
            parsedResume?.extractedData?.skills || [],

          education:
            parsedResume?.extractedData?.education || [],

          projects:
            parsedResume?.extractedData?.projects || [],

          experience:
            parsedResume?.extractedData?.experience || [],

          certifications:
            parsedResume?.extractedData?.certifications || [],
        },
      });

      const allResumes =
        await Resume.find({
          user: req.user.id,
        })
          .sort({ createdAt: 1 });

      if (allResumes.length > 3) {

        const oldestResume =
          allResumes[0];

        // DELETE IMAGEKIT FILE

        if (oldestResume.resumeFileId) {

          try {

            await imagekit.deleteFile(
              oldestResume.resumeFileId
            );

          } catch (error) {

            console.log(
              "Failed to delete old resume file"
            );
          }
        }

        // DELETE DATABASE RECORD

        await Resume.findByIdAndDelete(
          oldestResume._id
        );
      }

      console.log(resume);

      return res.status(200).json({

        success: true,

        message:
          "Resume uploaded successfully",

        resume,
      });

    } catch (error) {

      console.log(
        "UPLOAD ERROR:"
      );

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Error uploading resume",

        error:
          error.message,
      });
    }
  };

// ======================================
// GET USER RESUME
// ======================================

const getResume =
  async (req, res) => {

    try {

      const resume = await Resume
        .findOne({
          user: req.user.id,
        })
        .sort({ versionNumber: -1 });


      if (!resume) {

        return res.status(404).json({

          success: false,

          message:
            "Resume not found",
        });
      }


      return res.status(200).json({

        success: true,

        resume,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Error fetching resume",

        error: error.message,
      });
    }
  };

// ======================================
// GET RESUME VERSION
// ======================================

const getResumeVersions =
  async (req, res) => {

    try {

      const resumes =
        await Resume.find({
          user: req.user.id,
        })
          .sort({ versionNumber: -1 });

      return res.status(200).json({

        success: true,

        count: resumes.length,

        resumes,
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          "Error fetching resume versions",

        error: error.message,
      });
    }
  };


// ======================================
// GET LATEST RESUME ANALYSIS
// ======================================

const getLatestAnalysis = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      user: req.user.id,
    }).sort({
      versionNumber: -1,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "No resume found",
      });
    }

    return res.status(200).json({
      success: true,

      analysis: resume.aiAnalysis,

      versionNumber: resume.versionNumber,

      uploadedAt: resume.createdAt,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching analysis",
      error: error.message,
    });
  }
};

// ======================================
// GET ANALYSIS HISTORY
// ======================================

const getAnalysisHistory = async (req, res) => {
  try {

    const resumes = await Resume.find({
      user: req.user.id,
    })
    .sort({
      versionNumber: -1,
    });

    const history = resumes.map((resume) => ({
      resumeId: resume._id,

      versionNumber: resume.versionNumber,

      atsScore:
        resume.aiAnalysis?.atsScore || 0,

      uploadedAt: resume.createdAt,
    }));

    return res.status(200).json({
      success: true,

      count: history.length,

      history,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching analysis history",
      error: error.message,
    });

  }
};

// ======================================
// GET ANALYSIS BY RESUME ID
// ======================================

const getAnalysisById = async (req, res) => {
  try {

    const resume = await Resume.findOne({
      _id: req.params.resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume analysis not found",
      });
    }

    return res.status(200).json({
      success: true,

      analysis: resume.aiAnalysis,

      versionNumber: resume.versionNumber,

      originalFileName: resume.originalFileName,

      uploadedAt: resume.createdAt,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error fetching analysis",
      error: error.message,
    });

  }
};

// ======================================
// DELETE RESUME
// ======================================

const deleteResume =
  async (req, res) => {

    try {

      const resume =
        await Resume.findOne({

          _id: req.params.resumeId,

          user: req.user.id,
        });


      if (!resume) {

        return res.status(404).json({

          success: false,

          message:
            "Resume not found",
        });
      }


      // DELETE FROM IMAGEKIT

      if (
        resume.resumeFileId
      ) {

        try {

          await imagekit.deleteFile(

            resume.resumeFileId
          );

        } catch (deleteError) {

          console.log(deleteError);
        }
      }


      // DELETE DATABASE RECORD
      await Resume.findByIdAndDelete(
        resume._id
      );


      return res.status(200).json({

        success: true,

        message:
          "Resume deleted successfully",
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({

        success: false,

        message:
          "Error deleting resume",

        error: error.message,
      });
    }
  };

module.exports = {
  uploadResume,
  getResume,
  getResumeVersions,
  deleteResume,
  getLatestAnalysis,
  getAnalysisHistory,
  getAnalysisById,
};