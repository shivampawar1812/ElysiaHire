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

    mobile: {

      type: String,

      required: true,

      match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],

    },

    password: {
      type: String,
      required: true,
    },

    otp: {

      type: String,

    },

    otpExpiry: {

      type: Date,

    },

    isVerified: {

      type: Boolean,

      default: false,

    },

    resetOtp: {
      type: String,
      default: ""
    },

    resetOtpExpireAt: {
      type: Number,
      default: 0
    },

    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);