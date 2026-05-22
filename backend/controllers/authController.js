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

            otpExpiry: Date.now() + 1 * 60 * 1000,

        });

        await sendEmail(email, otp);

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

const sendResetOtp = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // generate otp
        const otp = String(
            Math.floor(100000 + Math.random() * 900000)
        );

        // save otp
        user.resetOtp = otp;

        // 1 minute expiry
        user.resetOtpExpireAt = Date.now() + 1 * 60 * 1000;

        await user.save();

        await sendEmail(email, otp);

        return res.json({

            success: true,

            message: "OTP Sent"
        });

    } catch (error) {

        return res.json({

            success: false,

            message: error.message
        });
    }
};

const verifyResetOtp = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.json({
                success: false,
                message: "User not found"
            });
        }

        // otp check
        if (user.resetOtp !== otp) {

            return res.json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // expiry check
        if (user.resetOtpExpireAt < Date.now()) {

            return res.json({
                success: false,
                message: "OTP Expired"
            });
        }

        return res.json({

            success: true,

            message: "OTP Verified"
        });

    } catch (error) {

        return res.json({

            success: false,

            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {

    try {

        const { email, password } = req.body;

        // check empty fields
        if (!email || !password) {

            return res.json({

                success: false,

                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.json({

                success: false,

                message: "User not found"
            });
        }

        // hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // update password
        user.password = hashedPassword;

        // clear reset otp
        user.resetOtp = "";

        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({

            success: true,

            message: "Password Reset Successful"
        });

    } catch (error) {

        console.log(error);

        return res.json({

            success: false,

            message: error.message
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

    sendResetOtp,

    verifyResetOtp,

    resetPassword,

    logoutUser,

};