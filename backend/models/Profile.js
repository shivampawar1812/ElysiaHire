const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    careerGoal: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    preferredRole: {
      type: String,
      default: "",
    },

    preferredIndustry: {
      type: String,
      default: "",
    },

    achievements: [String],

    socialLinks: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);