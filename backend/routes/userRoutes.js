const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const { updateUserProfile } = require("../controllers/userController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/profile", protect, (req, res) => {

    res.json(req.user);

});

router.put("/profile", protect, updateUserProfile);


router.post(
    "/upload-resume",
    protect,
    upload.single("resume"),
    (req, res) => {

        const User = require("../models/User");

        router.post(
            "/upload-resume",
            protect,
            upload.single("resume"),

            async (req, res) => {

                try {

                    const user = await User.findById(req.user._id);

                    user.resume = req.file.path;

                    await user.save();

                    res.json({
                        message: "Resume uploaded successfully",
                        resume: user.resume,
                    });

                } catch (error) {

                    res.status(500).json({
                        message: error.message,
                    });

                }

            }
        );

    }
);


router.post(
    "/upload-profile-image",
    protect,
    upload.single("image"),
    (req, res) => {

        router.post(
            "/upload-profile-image",
            protect,
            upload.single("image"),

            async (req, res) => {

                try {

                    const user = await User.findById(req.user._id);

                    user.profileImage = req.file.path;

                    await user.save();

                    res.json({
                        message: "Profile image uploaded successfully",
                        profileImage: user.profileImage,
                    });

                } catch (error) {

                    res.status(500).json({
                        message: error.message,
                    });

                }

            }
        );

    }
);

module.exports = router;