const generateToken = require("../utils/generateToken");

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const sendEmail = require("../utils/sendEmail");

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            mobile,
            password
        } = req.body;

        console.log(req.body);

        // ================= MOBILE VALIDATION =================

        if (!/^[0-9]{10}$/.test(mobile)) {

            return res.status(400).json({

                message: "Mobile number must be exactly 10 digits",

            });

        }

        // ================= CHECK USER =================

        const userExists = await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({

                message: "User already exists",

            });

        }

        // ================= HASH PASSWORD =================

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        // ================= CREATE USER =================

        const user = await User.create({

            name,

            email,

            mobile,

            password: hashedPassword,

            otp,

            otpExpiry: Date.now() + 10 * 60 * 1000,

        });

        const emailSent = await sendEmail(email, otp);

        if (!emailSent) {
            return res.status(500).json({
                message: "Email failed"
            });
        }

        // ================= RESPONSE =================

        res.status(201).json({

            _id: user._id,

            name: user.name,

            email: user.email,

            message: "OTP sent to email",

            userId: user._id,

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message: "User not found",

            });

        }

        if (user.otp !== otp) {

            return res.status(400).json({

                message: "Invalid OTP",

            });

        }

        if (user.otpExpiry < Date.now()) {

            return res.status(400).json({

                message: "OTP expired",

            });

        }

        user.isVerified = true;

        user.otp = undefined;

        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({

            message: "Email verified successfully",

            token: generateToken(user._id),

        });

    } catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: "Login Successful",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const logoutUser = async (req, res) => {

    res.status(200).json({

        message: "Logout successful",

    });

};

module.exports = {

    registerUser,

    loginUser,

    verifyOTP,

    logoutUser,

};