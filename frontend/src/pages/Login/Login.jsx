import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../../services/api";

import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/Home");

    } catch (error) {

      console.log(error.response?.data);

      alert("Invalid Credentials");

    }

  };
  return (

    <>

      {/* ================= HEADER ================= */}

      <header className="register-header">
        <div className="header-logo">
          <img src="./images/ElysiaHire.png" alt="ElysiaHire" />
        </div>
      </header>

      <div className="login-page">
        {/* LEFT SECTION */}

        <div className="login-left">

          <div className="left-content">
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
            <div className="hero-buttons">

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

        {/* RIGHT SECTION */}

        <div className="login-right">

          <div className="login-card">
            <h1>
              Welcome Back
            </h1>

            <p>
              Login to continue your career journey
            </p>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
              />
              
              <button type="submit">
                Login
              </button>
            </form>

            <div className="login-footer">

              <span>Don't have an account?</span>
              <Link to="/register">Sign Up</Link>

            </div>

          </div>

        </div>

      </div>

      <footer>
        <div className="footer-bottom">
          <p>© 2026 ElysiaHire. All rights reserved.</p>
        </div>
      </footer>
    </>
  );

};


export default Login;