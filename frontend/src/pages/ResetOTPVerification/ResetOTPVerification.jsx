import React, { useState } from "react";

import axios from "axios";

import API from "../../services/api";

import { useNavigate } from "react-router-dom";

import "./ResetOTPVerification.css";

const VerifyResetOtp = () => {

    const [otp, setOtp] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const email = localStorage.getItem("resetEmail");

            const { data } = await API.post(
                "/auth/verify-reset-otp",
                {
                    email,
                    otp
                }
            )

            if (data.success) {

                alert(data.message);

                navigate("/reset-password");

            } else {

                alert(data.message);
            }

        } catch (error) {

            alert(error.message);
        }
    };

    return (

        <div className="otp-page">

            <div className="otp-card">

                <div className="otp-header">
                    <img
                        src="/images/ElysiaHire.png"
                        alt="ElysiaHire"
                        className="otp-logo"
                    /></div>

                <h2>Verify OTP</h2>

                <p>
                    Enter the OTP sent to your email
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />

                    <button type="submit">

                        Verify OTP

                    </button>

                </form>

            </div>

        </div>
    );
};

export default VerifyResetOtp;