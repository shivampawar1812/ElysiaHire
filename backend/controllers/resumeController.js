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

      // FIND EXISTING RESUME

      const existingResume =
        await Resume.findOne({

          user: req.user.id,
        });

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

      // DELETE OLD RESUME FROM IMAGEKIT

      if (
        existingResume?.resumeFileId
      ) {

        try {

          await imagekit.deleteFile(

            existingResume.resumeFileId
          );

        } catch (deleteError) {

          console.log(
            "Old resume delete failed:"
          );

          console.log(deleteError);
        }
      }
      console.log(parsedResume);

      // CREATE / UPDATE RESUME

      const resume =
        await Resume.findOneAndUpdate(

          {
            user: req.user.id,
          },

          {

            user:
              req.user.id,

            originalFileName:
              req.file.originalname,

            resumeUrl:
              uploadedResume.url,

            resumeFileId:
              uploadedResume.fileId,

            parsedText:
              parsedResume
                ?.parsedText || "",

            extractedData: {

              skills:
                parsedResume
                  ?.extractedData
                  ?.skills || [],

              education:
                parsedResume
                  ?.extractedData
                  ?.education || [],

              projects:
                parsedResume
                  ?.extractedData
                  ?.projects || [],

              experience:
                parsedResume
                  ?.extractedData
                  ?.experience || [],

              certifications:
                parsedResume
                  ?.extractedData
                  ?.certifications || [],

              achievements:
                parsedResume
                  ?.extractedData
                  ?.achievements || [],
            },
          },

          {

            upsert: true,

            new: true,
          }
        );

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

      const resume =
        await Resume.findOne({

          user: req.user.id,
        });


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
// DELETE RESUME
// ======================================

const deleteResume =
  async (req, res) => {

    try {

      const resume =
        await Resume.findOne({

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

  deleteResume,
};