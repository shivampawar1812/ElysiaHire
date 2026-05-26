const multer =
require("multer");

const path =
require("path");

const storage =
multer.memoryStorage();

const fileFilter =
(req, file, cb) => {

  const allowedFileTypes = [

    ".pdf",

    ".doc",

    ".docx",

    ".txt",
  ];

  const ext =
    path.extname(
      file.originalname
    ).toLowerCase();

  if (
    allowedFileTypes.includes(ext)
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Unsupported file format"
      ),
      false
    );
  }
};

const upload =
multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      10 * 1024 * 1024,
  },
});

module.exports =
upload;