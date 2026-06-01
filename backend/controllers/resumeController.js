const Resume =
  require("../models/Resume");

const {
  parseResume,
} = require(
  "../services/resumeParserService"
);


// ======================================
// UPLOAD RESUME
// ======================================

const imagekit =
  require("../config/imagekit");

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
          req.file.buffer, req.file.originalname
        );

      console.log(parsedResume);

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

      const existingResumeCount =
        await Resume.countDocuments({
          user: req.user.id,
        });

      const versionNumber =
        existingResumeCount + 1;

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
};