import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../../services/api";

import "./Register.css";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      alert("Passwords do not match");

      return;
    }

    try {

      const res = await API.post(
        "/auth/register",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/verify-otp", {

        state: {

          email: formData.email,

        },

      });

    } catch (error) {

      console.log(error.response?.data);

      alert("Registration Failed");
    }

  };

  return (

    <>

      {/* ================= HEADER ================= */}

      <header className="register-header">

        <div className="header-logo">

          <img
            src="/images/ElysiaHire.png"
            alt="ElysiaHire"
          />

        </div>

      </header>

      {/* ================= PAGE ================= */}

      <div className="register-page">

        {/* ================= LEFT ================= */}

        <div className="register-left">

          <div className="left-content">
            <br />
            <br />
            <br />
            <h1>
              Your Path to the Dream Career
            </h1>

            <p>

              AI-powered resume analysis, interview preparation,
              and career tracking platform built for students
              and aspiring professionals.

            </p>
            <div class="hero-buttons">

              <button>
                <a href="#signup">Get Started</a>
              </button>

            </div>
            <div className="stats">

              <div>

                <h3>1000+</h3>

                <span>Resumes Analyzed</span>

              </div>

              <div>

                <h3>500+</h3>

                <span>Students Guided</span>

              </div>

              <div>

                <h3>95%</h3>

                <span>ATS Optimization</span>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="register-right">

          <div className="register-card">
            <h1>Welcome to ElysiaHire</h1>

            <p>Create account to start your career journey</p>

            {/* ================= FORM ================= */}

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                maxLength="10"
                pattern="[0-9]{10}"
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                required
                pattern="^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$"
                title="Password must be at least 6 characters long and contain at least one special character."
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />

              <button type="submit">
                Sign Up
              </button>

            </form>

            <div className="register-footer">

              <span>Already have an account?</span>
              <Link to="/">Login</Link>
            </div>

          </div>

        </div>

      </div>

      <footer>
        <div class="footer-bottom">
          <p>© 2026 ElysiaHire. All rights reserved.</p>
        </div>
      </footer>

    </>

  );

};

export default Register;