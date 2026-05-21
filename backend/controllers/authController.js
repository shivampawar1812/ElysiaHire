const generateToken = require("../utils/generateToken");

const bcrypt = require("bcryptjs");

const User = require("../models/User");

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            mobile,
            password
        } = req.body;

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

        // ================= CREATE USER =================

        const user = await User.create({

            name,
            email,
            mobile,
            password: hashedPassword,

        });

        // ================= RESPONSE =================

        res.status(201).json({

            _id: user._id,

            name: user.name,

            email: user.email,

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

module.exports = {
    registerUser,
    loginUser,
};