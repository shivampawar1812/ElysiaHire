import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../../services/api";

import "./ForgotPassword.css";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const { data } = await API.post(

                "/auth/send-reset-otp",

                { email }
            );

            if (data.success) {

                alert(data.message);

                // store email temporarily
                localStorage.setItem("resetEmail", email);

                // navigate to otp page
                navigate("/reset-otp-verification");

            } else {

                alert(data.message);
            }

        } catch (error) {

            alert(
                error.response?.data?.message || error.message
            );
        }
    };

    return (

        <div className="forgot-password-page">

            <div className="forgot-password-card">

                <div className="forgot-password-header">

                    <img
                        src="/images/ElysiaHire.png"
                        alt="ElysiaHire"
                        className="otp-logo"
                    />

                </div>

                <h2>Forgot Password</h2>

                <p>
                    Enter your registered email to receive OTP
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit">

                        Send OTP

                    </button>

                </form>

            </div>

        </div>
    );
};

export default ForgotPassword;