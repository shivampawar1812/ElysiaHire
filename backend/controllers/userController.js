const User = require("../models/User");

const updateUserProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        user.skills = req.body.skills || user.skills;
        user.college = req.body.college || user.college;
        user.github = req.body.github || user.github;
        user.linkedin = req.body.linkedin || user.linkedin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImage: updatedUser.profileImage,
            bio: updatedUser.bio,
            skills: updatedUser.skills,
            college: updatedUser.college,
            github: updatedUser.github,
            linkedin: updatedUser.linkedin,
            resume: updatedUser.resume,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

module.exports = {
    updateUserProfile,
};