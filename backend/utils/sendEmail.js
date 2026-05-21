const nodemailer = require("nodemailer");

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

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

        return true;

    } catch (error) {

        console.log("EMAIL ERROR:");

        console.log(error);

        return false;

    }

};

console.log("MAIL SENT");

module.exports = sendEmail;