const User = require("../models/User");

const Resume = require("../models/Resume");

const Profile = require("../models/Profile");


// ==========================================
// GET DASHBOARD DATA
// ==========================================

const getDashboard = async (req, res) => {

  try {

    // USER
    const user =
      await User.findById(req.user.id)
        .select("-password");

    // RESUME
    const resume =
      await Resume.findOne({
        user: req.user.id,
      });

    // PROFILE
    const profile =
      await Profile.findOne({
        user: req.user.id,
      });

    // DASHBOARD RESPONSE
    const dashboardData = {

      user: {

        id: user._id,

        name: user.name,

        email: user.email,
      },

      resume: resume
        ? {

          uploaded: true,

          originalFileName:
            resume.originalFileName,

          resumeUrl:
            resume.resumeUrl,

          extractedData:
            resume.extractedData,

          aiAnalysis:
            resume.aiAnalysis,
        }

        : {

          uploaded: false,
        },

      profile: profile
        ? {

          profilePhoto:
            profile.profilePhoto,

          shortBio:
            profile.shortBio,

          preferredRole:
            profile.preferredRole,

          location:
            profile.location,

          github:
            profile.github,

          linkedin:
            profile.linkedin,

          targetCompanies:
            profile.targetCompanies,

          experienceLevel:
            profile.experienceLevel,

          graduationYear:
            profile.graduationYear,

          currentEducationLevel:
            profile.currentEducationLevel,
        }

        : null,

      analytics: {

        totalSkills:
          resume?.extractedData?.skills?.length || 0,

        totalProjects:
          resume?.extractedData?.projects?.length || 0,

        totalCertifications:
          resume?.extractedData?.certifications?.length || 0,

        profileCompletion:
          calculateProfileCompletion(
            user,
            profile,
            resume
          ),
      },
    };

    return res.status(200).json({

      success: true,

      dashboard: dashboardData,
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        "Error fetching dashboard",

      error: error.message,
    });
  }
};


// ==========================================
// PROFILE COMPLETION CALCULATOR
// ==========================================

const calculateProfileCompletion = (
  user,
  profile,
  resume
) => {

  let completion = 0;

  // USER
  if (user.name) completion += 10;

  if (user.email) completion += 10;

  // RESUME
  if (resume) completion += 30;

  // PROFILE
  if (profile) {

    if (profile.shortBio) completion += 10;

    if (profile.github) completion += 10;

    if (profile.linkedin) completion += 10;

    if (profile.preferredRole) completion += 10;

    if (profile.profilePhoto) completion += 10;
  }

  return Math.min(completion, 100);
};


module.exports = {
  getDashboard,
};