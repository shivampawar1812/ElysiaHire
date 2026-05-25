import React, { Link, useEffect, useState, } from "react";

import { getDashboardData, uploadResume } from "../../services/dashboardServices";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import "./Dashboard.css"

const Dashboard = () => {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [selectedResume, setSelectedResume] = useState(null);

    const [uploading, setUploading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    // FETCH DASHBOARD
    const fetchDashboard =
        async () => {

            try {

                const data =
                    await getDashboardData();
                console.log(data);
                setDashboard(data.dashboard);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    const handleResumeUpload = async () => {
        try {

            if (!selectedResume) return;

            setUploading(true);

            const formData =
                new FormData();

            formData.append(
                "resume",
                selectedResume
            );

            await uploadResume(formData);

            await fetchDashboard();
            console.log(response);
            setSelectedResume(null);

        } catch (error) {

            console.log(error);

        } finally {

            setUploading(false);
        }
    };
    useEffect(() => {

        fetchDashboard();

    }, []);


    if (loading) {

        return (

            <div
                style={{

                    color:
                        "#f8f6f0",

                    background:
                        "#0f172a",

                    minHeight:
                        "100vh",

                    display:
                        "flex",

                    justifyContent:
                        "center",

                    alignItems:
                        "center",

                    textAlign:
                        "center",

                    padding:
                        "20px",

                    fontSize:
                        "clamp(1.5rem, 4vw, 2.8rem)",

                    fontWeight:
                        "700",

                    fontFamily:
                        "Segoe UI, sans-serif",

                    letterSpacing:
                        "1px",
                }}
            >

                Loading Dashboard...

            </div>
        );
    }


    return (
        <>
            <Header setIsOpen={setIsOpen} />

            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <main>
                <section className="profile-section">
                    <div className="profile-card">


                        {/* PROFILE SECTION */}

                        <div className="profile-top">

                            <img src={dashboard?.profile?.profilePhoto ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            } alt="profile" className="profile-image" />


                            <div className="profile-info">

                                <h1>{
                                    dashboard?.user?.name || dashboard?.resume
                                        ?.extractedData?.name || "User"
                                }</h1>
                                <p className="profile-role">
                                    {
                                        dashboard?.profile
                                            ?.preferredRole ||
                                        "Aspiring Professional"
                                    }
                                </p>
                            </div>

                        </div>

                        {/* READINESS */}

                        <div className="progress-section">

                            <div className="progress-text">

                                <h3>Placement Readiness</h3>

                                <span>{
                                    dashboard?.analytics?.profileCompletion ||
                                    0
                                }%
                                </span>

                            </div>

                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width:
                                            `${dashboard?.analytics?.profileCompletion}%`,
                                    }}
                                ></div>

                            </div>

                        </div>

                        {/* SKILLS */}

                        <div className="skills-section">

                            <h3>Skills</h3>

                            <div className="skills">

                                {dashboard?.resume
                                    ?.extractedData
                                    ?.skills?.length > 0 ? (
                                    dashboard?.resume
                                        ?.extractedData
                                        ?.skills
                                        ?.slice(0, 8)
                                        ?.map((skill) => (
                                            <span
                                                key={skill._id}

                                                className="skill-badge"
                                            >
                                                {skill.name}
                                            </span>
                                        ))
                                )
                                    : (
                                        <p>
                                            Upload resume to
                                            extract skills
                                        </p>
                                    )
                                }
                            </div>

                        </div>


                        {/* CAREER GOAL */}

                        <div className="goals-section">

                            <h3>Career Goal</h3>

                            <p>
                                {
                                    dashboard?.profile
                                        ?.careerGoal ||
                                    "Add your career goal to personalize dashboard."
                                }
                            </p>
                        </div>


                        <div className="profile-buttons">
                            <button
                                className="edit-btn"
                                onClick={() => setShowModal(true)}
                            >
                                Edit Profile
                            </button></div>
                        {
                            showModal && (
                                <EditProfileModal
                                    dashboard={dashboard}
                                    onClose={() =>
                                        setShowModal(false)
                                    }
                                    refreshDashboard={
                                        fetchDashboard
                                    }
                                />
                            )
                        }
                    </div>
                </section>

                {/* UPLOAD RESUME SECTION */}
                <section className="resume-analyzer">

                    <div className="section-title">
                        <br />
                        <h2>Resume Analyzer</h2>
                        <p>
                            Upload your resume and receive AI-powered ATS analysis,
                            keyword insights, and improvement recommendations.
                        </p>
                    </div>

                    {/* TOP GRID */}
                    <div className="resume-top-grid">
                        {/* UPLOAD CARD */}

                        <div className="resume-card upload-card">
                            {/* TITLE */}

                            <h3>Upload Resume</h3>

                            {/* STATUS */}
                            {
                                dashboard?.resume?.uploaded

                                    ? (

                                        <div className="resume-status">

                                            <p className="resume-success">
                                                Resume Uploaded Successfully
                                            </p>

                                            <p className="resume-name">
                                                {
                                                    dashboard?.resume
                                                        ?.originalFileName
                                                }
                                            </p>
                                        </div>
                                    )

                                    : (

                                        <p className="no-resume">

                                            No Resume Uploaded

                                        </p>
                                    )
                            }


                            {/* FILE INPUT + BUTTON */}

                            <div className="file-input-wrapper">

                                <label
                                    htmlFor="resumeUpload"
                                    className="custom-file-upload"
                                >

                                    Choose File

                                </label>

                                <input

                                    id="resumeUpload"

                                    type="file"

                                    accept=".pdf,.doc,.docx,.txt"

                                    onChange={(e) =>
                                        setSelectedResume(
                                            e.target.files[0]
                                        )
                                    }
                                />


                                {

                                    selectedResume && (

                                        <p className="selected-file-name">

                                            {selectedResume.name}

                                        </p>
                                    )
                                }


                                <button

                                    onClick={handleResumeUpload}

                                    disabled={!selectedResume}

                                >

                                    {
                                        uploading
                                            ? "Uploading..."
                                            : "Upload Resume"
                                    }

                                </button>

                            </div>
                        </div>

                        <div className="resume-card ats-card">

                            <h3>ATS Score</h3>

                            <div className="ats-circle">
                                <span>82%</span>
                            </div>

                            <p>
                                Your resume is well optimized for ATS systems.
                            </p>

                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <div className="footer-bottom">
                    <p>© 2026 ElysiaHire. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};


export default Dashboard;