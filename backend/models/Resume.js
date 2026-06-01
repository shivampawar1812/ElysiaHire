const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    versionNumber: {
      type: Number,
      required: true,
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

    atsScore: {
      type: Number,
      default: 0,
    },

    strengths: [String],

    weaknesses: [String],

    missingSkills: [String],

    suggestions: [String],

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

resumeSchema.index({
  user: 1,
  versionNumber: -1,
});

module.exports = mongoose.model("Resume", resumeSchema);