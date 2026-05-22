import React, { useState } from "react";

import axios from "axios";

import API from "../../services/api";

import "./ResetPassword.css";

const ResetPassword = () => {

    const [formData, setFormData] = useState({

        password: "",

        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match");

            return;
        }

        try {

            const email = localStorage.getItem("resetEmail");

            const { data } = await API.post(

                "/auth/reset-password",

                {
                    email,
                    password: formData.password
                }
            );

            if (data.success) {

                alert(data.message);

                localStorage.removeItem("resetEmail");

                window.location.href = "/";

            } else {

                alert(data.message);
            }

        } catch (error) {

            alert(error.message);
        }
    };

    return (

        <div className="reset-password-page">

            <div className="reset-password-card">

                <div className="reset-password-header">
                    <img
                        src="/images/ElysiaHire.png"
                        alt="ElysiaHire"
                        className="otp-logo"
                    /></div>

                <h2>Reset Password</h2>

                <p>
                    Create your new password
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        onChange={handleChange}
                        required
                        pattern="^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$"
                        title="Password must be at least 6 characters long and contain at least one special character."
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">

                        Reset Password

                    </button>

                </form>

            </div>

        </div>
    );
};

export default ResetPassword;