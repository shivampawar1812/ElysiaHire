import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import About from "../About/About";
import "./Home.css";

import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header setIsOpen={setIsOpen} />

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <main className="hero" id="1">


        <div className="hero-content">

          <h1>Your Path to the Dream Career</h1>

          <p>
            AI-powered resume analysis, interview preparation,
            and career tracking platform built for students
            and aspiring professionals.
          </p>


          <div className="hero-buttons">
            <div><a href=""><button>Explore</button></a></div>

          </div>

          <div className="hero-stats">

            <div>
              <h3>1000+</h3>
              <p>Resumes Analyzed</p>
            </div>

            <div>
              <h3>500+</h3>
              <p>Students Helped</p>
            </div>

            <div>
              <h3>95%</h3>
              <p>ATS Optimization</p>
            </div>

          </div>

        </div>

        <div className="hero-image">

          <img src="images/career-image.png" alt="Career Illustration" />

        </div>

      </main>



      <footer>
        <div className="footer-brand">

          <h2>ElysiaHire</h2>

          <p>
            Helping students and professionals build their dream careers with AI-powered tools.
          </p><p>

          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <p><a href="">Features</a></p>

          <p><Link to="/about"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth"
              })
            }>About</Link></p>

          <p><a href="">Contact</a></p>

        </div>

        <div className="footer-resources">

          <h3>Resources</h3>


          <p><a href="">Blog</a></p>

          <p><a href="">Resume Tips</a></p>

          <p><a href="">Career Guides</a></p>


        </div>

        <div className="footer-social">

          <h3>Follow Us</h3>

          <a href="https://www.linkedin.com/in/shivam-pawar0118/" target="_blank">
            LinkedIn
          </a>

          <a href="https://github.com/shivampawar1812" target="_blank">
            GitHub
          </a>

          <a href="https://www.instagram.com/shivam_pawar_18" target="_blank">
            Instagram
          </a>

        </div>


        <div className="footer-bottom">
          <p>© 2026 ElysiaHire. All rights reserved.</p>
        </div>

      </footer>

    </>

  );

};

export default Home;