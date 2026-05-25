const Profile = require("../models/Profile");


// ==========================================
// CREATE / UPDATE PROFILE
// ==========================================

const updateProfile = async (req, res) => {

  try {

    const {
      profilePhoto,
      bio,
      careerGoal,
      github,
      linkedin,
      portfolio,
      location,
      preferredRole,
      preferredIndustry,
      achievements,
      socialLinks,
    } = req.body;

    const profile =
      await Profile.findOneAndUpdate(

        {
          user: req.user.id,
        },

        {
          user: req.user.id,

          profilePhoto,

          bio,

          careerGoal,

          github,

          linkedin,

          portfolio,

          location,

          preferredRole,

          preferredIndustry,

          achievements,

          socialLinks,
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
};