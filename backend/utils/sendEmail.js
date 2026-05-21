const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {

    try {

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: process.env.EMAIL_USER,

                pass: process.env.EMAIL_PASS,

            },

        });

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: email,

            subject: "ElysiaHire OTP Verification",

            text: `Your OTP is ${otp}`,

        };

        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");

    } catch (error) {

        console.log("EMAIL ERROR:");

        console.log(error);

    }

};

module.exports = sendEmail;