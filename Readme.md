# ElysiaHire

### Your Path to the Next Opportunity

ElysiaHire is an AI-powered Resume Intelligence platform designed to help students, freshers, and job seekers optimize their resumes using recruiter-style evaluations and actionable AI feedback.

By combining modern web technologies with Large Language Models (LLMs), ElysiaHire provides personalized resume insights that bridge the gap between academic achievements and real-world hiring expectations.

---

## 🚀 Overview

Preparing an effective resume often requires multiple rounds of feedback from mentors, peers, or recruiters. However, access to personalized guidance is limited, and generic ATS checkers fail to provide meaningful improvement suggestions.

ElysiaHire addresses this challenge by delivering intelligent, context-aware resume evaluations that help candidates understand:

* How well their resume aligns with a target job description
* Their strengths and weaknesses
* Missing or underrepresented skills
* Recruiter-style recommendations for improvement
* Potential career roles suited to their profile

---

## ✨ Features

### 🔐 Authentication & Security

* Secure User Registration and Login
* JWT-based Authentication
* Password Hashing using bcrypt
* Protected Backend APIs
* Frontend–Backend Authentication Integration

---

### 📄 Resume Management

* Resume Upload System
* ImageKit-based Resume Storage
* Resume Metadata Management
* Resume Version Tracking (Latest 3 Versions)
* Persistent Resume History

---

### 🧠 AI Resume Intelligence

Powered by **Groq + Llama 3.3 70B**

* ATS-style Score Generation
* Strength Analysis
* Weakness Detection
* Missing Skills Identification
* Personalized Improvement Suggestions
* Recommended Career Roles
* Structured JSON-based Evaluations

---

### 📊 Resume Intelligence Dashboard

* Dynamic ATS Score Visualization
* AI-generated Resume Insights
* Skills Overview
* Resume Activity Tracking
* Personalized User Experience

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt

### AI Layer

* Groq API
* Llama 3.3 70B
* Prompt Engineering
* Structured JSON Outputs
* Resume Evaluation Pipeline

### Cloud & Storage

* ImageKit

### Development Tools

* Git
* GitHub
* VS Code
* Postman

---

## ⚙️ Architecture

The application follows a modular MVC architecture:

```bash
ElysiaHire/
├── frontend/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── utils/
├── README.md
└── package.json
```

---

## 📈 Development Status

| Module                        | Status         |
| ----------------------------- | -------------- |
| Authentication                | ✅ Complete     |
| Backend APIs                  | ✅ Complete     |
| Resume Upload                 | ✅ Complete     |
| Resume Version Tracking       | ✅ Complete     |
| Resume Intelligence Dashboard | ✅ Complete     |
| AI Resume Evaluation          | ✅ Complete     |
| Frontend UI                   | ✅ Complete     |
| Deployment                    | 🚧 In Progress |

---

## 🔐 Environment Variables

```env
MONGODB_URI=
JWT_SECRET=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
GROQ_API_KEY=
PORT=5000
```

---

## 🚀 Future Enhancements

Potential future directions include:

* AI-powered Mock Interviews
* Adaptive Interview Feedback
* Skill Gap Analysis
* Personalized Career Roadmaps
* Career Growth Tracking
* Resume Comparison Analytics

These features are part of the broader ElysiaHire vision but are not included in the current release.

---

## 🎯 Project Goal

The goal of ElysiaHire is to democratize access to high-quality resume feedback by providing every candidate with personalized, recruiter-style insights that improve placement readiness and confidence.

---

## 👨‍💻 Author

**Shivam Pawar**

Building AI systems that make career preparation more accessible, personalized, and effective.

---

## 📌 Current Status

🚀 **Working AI Resume Intelligence System with end-to-end functionality. Deployment in progress.**
