import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import "./About.css";


import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";


const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (

    <>

      <Header setIsOpen={setIsOpen} />
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <main className="about-hero">

        <div className="about-content">

          <h1>About ElysiaHire</h1>

          <p>

            <b>

              ElysiaHire – Your Path to the Next Opportunity

            </b>

            {" "}is an AI-powered career preparation
            platform designed to help students
            and job seekers become interview-ready
            through smart, personalized, and
            realistic preparation experiences.

          </p>

          <p>

            Our mission is to bridge the gap
            between academic learning and
            real-world hiring by providing tools
            that improve confidence,
            communication, technical skills,
            and overall placement readiness.

          </p>

          <p>

            ElysiaHire combines Artificial
            Intelligence, mock interview
            simulation, resume analysis,
            and performance tracking to
            create a complete career
            preparation ecosystem.

          </p>

          <p>

            The platform is built especially
            for students, fresh graduates,
            internship seekers, and aspiring
            professionals who want structured
            preparation for placements and
            job opportunities.

          </p>
          <br />
          {/* <h3>

            What ElysiaHire Offers

          </h3> */}

          {/* <ul>

            <li>AI-powered mock interviews</li>

            <li>Resume and ATS analysis</li>

            <li>Communication and confidence evaluation</li>

            <li>Personalized feedback and improvement tips</li>

            <li>Company-specific interview preparation</li>

            <li>Skill gap analysis and career recommendations</li>

            <li>Performance tracking dashboard</li>

          </ul> */}

          <h3>

            Our Vision

          </h3>

          <p>

            To make quality interview
            preparation accessible,
            affordable, and effective
            for every student,
            regardless of their
            background or location.

          </p>

          <h3>

            Our Goal

          </h3>

          <p>

            To help users build confidence,
            improve employability, and move
            one step closer to achieving
            their dream careers.

          </p>

          <div className="about-highlight">

            ElysiaHire is not just a
            preparation platform —
            it is your intelligent
            career companion for
            the journey ahead.

          </div>

        </div>

      </main>

      <footer>
        <div className="footer-bottom">
          <p>© 2026 ElysiaHire. All rights reserved.</p>
        </div>
      </footer>

    </>

  );

};

export default About;