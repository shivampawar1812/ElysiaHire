const mongoose =
  require("mongoose");


const profileSchema =
  new mongoose.Schema(

    {

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,
      },


      profilePhoto: {

        type: String,

        default: "",
      },

      profilePhotoFileId: {
        type: String,
      },


      shortBio: {

        type: String,

        trim: true,

        default: "",
      },


      preferredRole: {

        type: String,

        trim: true,

        default: "",
      },


      location: {

        type: String,

        trim: true,

        default: "",
      },


      github: {

        type: String,

        trim: true,

        default: "",
      },


      linkedin: {

        type: String,

        trim: true,

        default: "",
      },


      targetCompanies: [

        {

          type: String,
        },
      ],


      experienceLevel: {

        type: String,

        enum: [

          "Student",

          "Beginner",

          "Intermediate",

          "Advanced",
        ],

        default: "Student",
      },


      graduationYear: {

        type: Number,
      },


      currentEducationLevel: {

        type: String,

        default: "",
      },
    },

    {

      timestamps: true,
    }
  );


module.exports =
  mongoose.model(
    "Profile",
    profileSchema
  );