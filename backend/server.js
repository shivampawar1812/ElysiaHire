const express = require("express");

const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const resumeRoutes = require("./routes/resumeRoutes");

const profileRoutes = require("./routes/profileRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const connectDB = require("./config/db");

const path = require("path");

const app = express();


connectDB();


app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/dashboard",dashboardRoutes);

app.get("/", (req, res) => {
  res.send("ElysiaHire Backend Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});