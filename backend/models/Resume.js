const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    resumeFileId: {
      type: String,
    },

    parsedText: {
      type: String,
      default: "",
    },

    extractedData: {
      name: String,

      email: String,

      phone: String,

      location: String,

      github: String,

      linkedin: String,

      college: String,

      education: [
        {
          degree: String,
          institution: String,
          year: String,
        },
      ],

      skills: [
        {
          name: String,
          level: {
            type: String,
            default: "Intermediate",
          },
        },
      ],

      projects: [
        {
          title: String,
          description: String,
          techStack: [String],
        },
      ],

      experience: [
        {
          company: String,
          role: String,
          duration: String,
          description: String,
        },
      ],

      certifications: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);