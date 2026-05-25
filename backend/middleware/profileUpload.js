const multer =
require("multer");

const path =
require("path");


// STORAGE
const storage =
multer.diskStorage({

  destination:
  function (req, file, cb) {

    cb(
      null,
      "uploads/profile"
    );
  },

  filename:
  function (req, file, cb) {

    const uniqueName =

      Date.now()

      + "-"

      + Math.round(
          Math.random() * 1E9
        )

      + path.extname(
          file.originalname
        );

    cb(
      null,
      uniqueName
    );
  },
});


// FILE FILTER
const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [

    "image/png",

    "image/jpeg",

    "image/jpg",

    "image/webp",
  ];


  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(null, true);

  } else {

    cb(

      new Error(
        "Only image files are allowed"
      ),

      false
    );
  }
};


// EXPORT
const uploadProfilePhoto =
multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
    5 * 1024 * 1024,
  },
});


module.exports =uploadProfilePhoto;