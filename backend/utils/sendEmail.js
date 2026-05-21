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

            subject: "ElysiaHire Email Verification",

            html: `

                <h2>ElysiaHire Verification</h2>

                <p>Your OTP is:</p>

                <h1>${otp}</h1>

                <p>This OTP expires in 10 minutes.</p>

            `,

        };

        const info = await transporter.sendMail(
            mailOptions
        );

        console.log("EMAIL SENT:", info.response);

    } catch (error) {

        console.log("EMAIL ERROR:");

        console.log(error);

    }

};

module.exports = sendEmail;