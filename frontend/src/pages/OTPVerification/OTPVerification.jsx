import { useState } from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import API from "../../services/api";

import "./OTPVerification.css";

const OTPVerification = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(

        "/auth/verify-otp",

        {

          email,

          otp,

        }

      );

      localStorage.setItem(

        "token",

        res.data.token

      );

      alert("Email Verified Successfully");

      navigate("/Home");

    } catch (error) {

      console.log(error.response?.data);

      alert("Invalid or Expired OTP");

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

        <h2>

          Verify Your Email

        </h2>

        <p>

          Enter the OTP sent to:

          <br />

          <span>{email}</span>

        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
          />

          <button type="submit">

            Verify OTP

          </button>

        </form>

      </div>

    </div>

  );

};

export default OTPVerification;