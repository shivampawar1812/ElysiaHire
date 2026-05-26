const Profile = require("../models/Profile");


// ==========================================
// CREATE / UPDATE PROFILE
// ==========================================

const updateProfile = async (req, res) => {

  try {

    const {

      profilePhoto,

      shortBio,

      preferredRole,

      location,

      github,

      linkedin,

      targetCompanies,

      experienceLevel,

      graduationYear,

      currentEducationLevel,

    } = req.body;

    const profile =
      await Profile.findOneAndUpdate(

        {
          user: req.user.id,
        },

        {

          user: req.user.id,

          profilePhoto,

          shortBio,

          preferredRole,

          location,

          github,

          linkedin,

          targetCompanies,

          experienceLevel,

          graduationYear,

          currentEducationLevel,
        },

        {
          returnDocument: "after",
          upsert: true,
        }
      );

    return res.status(200).json({

      success: true,

      message:
        "Profile updated successfully",

      profile,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        "Error updating profile",

      error: error.message,
    });
  }
};


const fs =
require("fs");


// ======================================
// UPLOAD PROFILE PHOTO
// ======================================

const imagekit =
require("../config/imagekit");

const uploadProfilePhoto =
async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({

        success: false,

        message:
        "Profile image is required",
      });
    }

    // FIND EXISTING PROFILE

    const existingProfile =
      await Profile.findOne({

        user: req.user.id,
      });

    // DELETE OLD IMAGE FROM IMAGEKIT

    if (
      existingProfile?.profilePhotoFileId
    ) {

      try {

        await imagekit.deleteFile(

          existingProfile
          .profilePhotoFileId
        );

      } catch (deleteError) {

        console.log(
          "Old image delete failed:"
        );

        console.log(deleteError);
      }
    }

    // UPLOAD NEW IMAGE

    const uploadedImage =
      await imagekit.upload({

        file:
          req.file.buffer,

        fileName:
          `${Date.now()}-${req.file.originalname}`,

        folder:
          "/elysiahire/profile-photos",
      });

    // UPDATE DATABASE

    const profile =
      await Profile.findOneAndUpdate(

        {
          user: req.user.id,
        },

        {

          profilePhoto:
            uploadedImage.url,

          profilePhotoFileId:
            uploadedImage.fileId,
        },

        {

          upsert: true,

          new: true,
        }
      );

    return res.status(200).json({

      success: true,

      message:
      "Profile photo uploaded successfully",

      profile,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message:
      "Error uploading profile photo",

      error:
      error.message,
    });
  }
};
// ==========================================
// GET PROFILE
// ==========================================

const getProfile = async (req, res) => {

  try {

    const profile =
      await Profile.findOne({
        user: req.user.id,
      });

    if (!profile) {

      return res.status(404).json({

        success: false,

        message: "Profile not found",
      });
    }

    return res.status(200).json({

      success: true,

      profile,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        "Error fetching profile",

      error: error.message,
    });
  }
};


module.exports = {

  updateProfile,

  getProfile,

  uploadProfilePhoto,
};