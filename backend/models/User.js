const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },

    profileImage: {
      type: String,
      default: "",

      bio: {
        type: String,
        default: "",
      },

      skills: {
        type: [String],
        default: [],
      },

      college: {
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

      resume: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);