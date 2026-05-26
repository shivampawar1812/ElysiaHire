import React, { Link, useEffect, useState, } from "react";

import { getDashboardData, uploadResume } from "../../services/dashboardServices";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import { uploadProfilePhoto, } from "../../services/dashboardServices";

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

    const handleProfilePhotoUpload =
        async (e) => {

            try {

                const file =
                    e.target.files[0];

                if (!file) return;


                const formData =
                    new FormData();

                formData.append(
                    "profilePhoto",
                    file
                );


                await uploadProfilePhoto(
                    formData
                );


                await fetchDashboard();

            } catch (error) {

                console.log(error);
            }
        };

    // FETCH DASHBOARD
    const fetchDashboard =
        async () => {

            try {

                console.log("FETCH START");

                const data =
                    await getDashboardData();

                console.log("API RESPONSE:", data);

                setDashboard(
                    data.dashboard
                );

            } catch (error) {

                console.log(
                    "DASHBOARD ERROR:",
                    error
                );

            } finally {

                console.log(
                    "FETCH FINISHED"
                );

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

            const response =
                await uploadResume(formData);

            console.log(response);

            await fetchDashboard();
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

                    minHeight: "100vh",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    background: "#0f172a",

                    color: "#f8f6f0",

                    fontSize: "1.2rem",

                    fontWeight: "600",

                    letterSpacing: "0.5px"
                }}
            >

                Loading...

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
            <main className="profile-main">
                <section className="profile-section">
                    <div className="profile-card">


                        {/* PROFILE SECTION */}

                        <div className="profile-top">

                            <div className="profile-image-wrapper">

                                <img

                                    src={

                                        dashboard?.profile?.profilePhoto ||

                                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                    }

                                    alt="profile"

                                    className="profile-image"
                                />


                                {/* CAMERA ICON */}

                                <label
                                    htmlFor="profilePhotoUpload"
                                    className="profile-camera-icon"
                                >

                                    <i className="fa-solid fa-camera"></i>

                                </label>


                                {/* HIDDEN INPUT */}

                                <input

                                    id="profilePhotoUpload"

                                    type="file"

                                    accept="image/*"

                                    hidden

                                    onChange={handleProfilePhotoUpload}
                                />

                            </div>


                            <div className="profile-info">

                                <h1>{
                                    dashboard?.user?.name || dashboard?.resume
                                        ?.extractedData?.name || "User"
                                }</h1>
                                <p className="profile-role">

                                    {
                                        dashboard?.profile?.shortBio
                                        || "Add a short bio"
                                    }

                                </p>

                                <p className="profile-location">

                                    <i className="fa-solid fa-location-dot"></i>

                                    {
                                        dashboard?.profile?.location
                                        || "Location not added"
                                    }

                                </p>
                            </div>

                        </div>


                        <div className="education-info">

                            {
                                dashboard?.profile
                                    ?.currentEducationLevel && (

                                    <span>

                                        {
                                            dashboard.profile
                                                .currentEducationLevel
                                        }

                                    </span>
                                )
                            }

                            {
                                dashboard?.profile
                                    ?.graduationYear && (

                                    <span>

                                        Class of {

                                            dashboard.profile
                                                .graduationYear
                                        }

                                    </span>
                                )
                            }

                        </div>

                        {
                            dashboard?.profile?.experienceLevel && (

                                <div className="profile-level">

                                    <span>

                                        {
                                            dashboard.profile
                                                .experienceLevel
                                        }

                                    </span>

                                </div>
                            )
                        }

                        {/* READINESS */}

                        <div className="progress-section">

                            <div className="progress-text">

                                <h3>Profile Completion</h3>

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
                                            `${dashboard?.analytics?.profileCompletion}%`
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

                        {
                            dashboard?.profile
                                ?.targetCompanies?.length > 0 && (

                                <div className="target-companies">

                                    <h3>
                                        Target Companies
                                    </h3>

                                    <div className="company-tags">

                                        {
                                            dashboard.profile
                                                .targetCompanies
                                                .map((company, index) => (

                                                    <span
                                                        key={index}
                                                        className="company-tag"
                                                    >

                                                        {company}

                                                    </span>
                                                ))
                                        }

                                    </div>

                                </div>
                            )
                        }


                        {/* CAREER GOAL */}

                        <div className="goals-section">

                            <h3>Career Goal</h3>

                            <p>

                                {
                                    dashboard?.profile?.preferredRole
                                    || "Add your preferred role"
                                }

                            </p>
                        </div>

                        <div className="profile-socials">

                            {
                                dashboard?.profile?.github && (

                                    <a

                                        href={
                                            dashboard.profile.github
                                        }

                                        target="_blank"

                                        rel="noreferrer"
                                    >

                                        <i className="fa-brands fa-github"></i>

                                    </a>
                                )
                            }


                            {
                                dashboard?.profile?.linkedin && (

                                    <a

                                        href={
                                            dashboard.profile.linkedin
                                        }

                                        target="_blank"

                                        rel="noreferrer"
                                    >

                                        <i className="fa-brands fa-linkedin"></i>

                                    </a>
                                )
                            }

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