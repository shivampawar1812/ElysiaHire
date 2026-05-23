const express = require("express");

const cors = require("cors");

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const authRoutes = require("./routes/authRoutes");

const resumeRoutes = require("./routes/resumeRoutes");

const connectDB = require("./config/db");

const path = require("path");

const app = express();


connectDB();


app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("ElysiaHire Backend Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});