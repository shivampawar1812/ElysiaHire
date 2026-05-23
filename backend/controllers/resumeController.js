const fs = require("fs");

const pdfParse = require("pdf-parse");

const Resume = require("../models/Resume");

const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }
        const fileBuffer = fs.readFileSync(req.file.path);

        const parsedData = await pdfParse(fileBuffer);

        const extractedText = parsedData.text;

        const cleanedText = extractedText
            .replace(/\s+/g, " ")
            .trim();

        const newResume = new Resume({

            userId: req.user?.id || null,

            filename: req.file.filename,

            originalName: req.file.originalname,

            resumeUrl: req.file.path,

            extractedText: cleanedText

        });

        await newResume.save();

        res.status(201).json({

            success: true,

            message: "Resume uploaded and parsed successfully",

            preview: cleanedText.substring(0, 300),

            data: newResume
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message
        });
    }
};

const getResumeById = async (req, res) => {

    res.json({
        success: true,
        message: "Get Resume By ID Working"
    });

};

const getUserResumes = async (req, res) => {

    res.json({
        success: true,
        message: "Get User Resumes Working"
    });

};

module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById,
};