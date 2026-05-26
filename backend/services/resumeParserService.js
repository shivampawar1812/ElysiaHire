
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const textract = require("textract");


// ================================
// EXTRACT TEXT FROM FILE
// ================================

const extractTextFromFile =
  async (
    fileBuffer,
    fileName
  ) => {

    const ext =
      path.extname(fileName)
        .toLowerCase();

    try {

      // PDF FILES

      if (ext === ".pdf") {

        const pdfData =
          await pdfParse(fileBuffer);

        return pdfData.text;
      }

      // DOCX FILES

      else if (ext === ".docx") {

        const result =
          await mammoth.extractRawText({

            buffer:
              fileBuffer,
          });

        return result.value;
      }

      // TXT FILES

      else if (ext === ".txt") {

        return fileBuffer.toString(
          "utf8"
        );
      }

      // DOC FILES

      else if (ext === ".doc") {

        throw new Error(
          ".doc files are not supported yet"
        );
      }

      else {

        throw new Error(
          "Unsupported file type"
        );
      }

    } catch (error) {

      console.log(error);

      throw new Error(
        "Error extracting text from resume"
      );
    }
  };

// ================================
// NORMALIZE TEXT
// ================================

const normalizeText = (text) => {

  return text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// ================================
// EXTRACT SECTIONS
// ================================

const extractSections = (text) => {

  const sections = {

    skills: "",

    education: "",

    projects: "",

    experience: "",

    certifications: "",
  };

  const lowerText = text.toLowerCase();

  const sectionKeywords = {

    skills: [
      "skills",
      "technical skills",
      "technologies",
    ],

    education: [
      "education",
      "academic background",
    ],

    projects: [
      "projects",
      "personal projects",
    ],

    experience: [
      "experience",
      "work experience",
      "internship",
    ],

    certifications: [
      "certifications",
      "licenses",
    ],
  };

  const lines = text.split(/\n|\r/);

  let currentSection = null;

  lines.forEach((line) => {

    const trimmedLine =
      line.trim().toLowerCase();

    // FIND SECTION
    for (const section in sectionKeywords) {

      if (
        sectionKeywords[section].includes(
          trimmedLine
        )
      ) {

        currentSection = section;

        return;
      }
    }

    // STORE SECTION CONTENT
    if (currentSection) {

      sections[currentSection] +=
        line + "\n";
    }
  });

  return sections;
};

// ================================
// EXTRACT EMAIL
// ================================

const extractEmail = (text) => {

  const emailRegex =
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

  const matches = text.match(emailRegex);

  return matches ? matches[0] : "";
};


// ================================
// EXTRACT PHONE
// ================================

const extractPhone = (text) => {

  const phoneRegex =
    /(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}/g;

  const matches = text.match(phoneRegex);

  return matches ? matches[0] : "";
};


// ================================
// EXTRACT GITHUB
// ================================

const extractGithub = (text) => {

  const githubRegex =
    /(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+/gi;

  const matches = text.match(githubRegex);

  return matches ? matches[0] : "";
};


// ================================
// EXTRACT LINKEDIN
// ================================

const extractLinkedin = (text) => {

  const linkedinRegex =
    /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/gi;

  const matches = text.match(linkedinRegex);

  return matches ? matches[0] : "";
};


// ================================
// SKILL DATABASE
// ================================

const skillDatabase = [

  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express.js",
  "React",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
  "Firebase",
  "REST API",
  "Redux",
  "Next.js",
  "Machine Learning",
  "Data Structures",
  "Algorithms",
  "SQL",
  "C",
  "MATLAB",
  "NumPy",
  "Scikit-learn",
  "Pandas",
  "Matplotlib",
  "Seaborn",
  "Flask",
  "FastAPI",
  "NLP",
  "Linux",
  "SHAP",
  "LIME",
  "SVM",
];


// ================================
// EXTRACT SKILLS
// ================================

const extractSkills = (skillsText) => {

  const foundSkills = [];

  const lowerCaseText =
    skillsText.toLowerCase();

  skillDatabase.forEach((skill) => {

    if (
      lowerCaseText.includes(
        skill.toLowerCase()
      )
    ) {

      foundSkills.push({

        name: skill,

        level: "Intermediate",
      });
    }
  });

  return foundSkills;
};


// ================================
// EXTRACT EDUCATION
// ================================

const extractEducation = (text) => {

  const educationKeywords = [
    "Bachelor",
    "B.Tech",
    "BCA",
    "MCA",
    "Master",
    "University",
    "College",
  ];

  const education = [];

  educationKeywords.forEach((keyword) => {

    if (
      text.toLowerCase().includes(
        keyword.toLowerCase()
      )
    ) {

      education.push({
        degree: keyword,
      });
    }
  });

  return education;
};

// ================================
// EXTRACT PROJECTS
// ================================

const extractProjects = (projectsText) => {

  const projects = [];

  const lines = projectsText.split("\n");

  lines.forEach((line) => {

    const trimmed = line.trim();

    // IGNORE EMPTY
    if (!trimmed) return;

    // IGNORE BULLETS
    if (
      trimmed.startsWith("•") ||
      trimmed.startsWith("-")
    ) {
      return;
    }

    // PROJECT TITLE DETECTION
    const isProjectTitle =

      // CONTAINS TECH STACK SEPARATOR
      trimmed.includes("|") ||

      // CONTAINS DATE
      /\b(20\d{2})\b/.test(trimmed);


    if (isProjectTitle) {

      // REMOVE EXTRA SPACES
      const cleanTitle = trimmed
        .replace(/\s+/g, " ")
        .trim();

      projects.push({

        title: cleanTitle,

        description: "",

        techStack: [],
      });
    }
  });

  return projects.slice(0, 5);
};

// ================================
// EXTRACT EXPERIENCE
// ================================

const extractExperience = (
  experienceText
) => {

  const experience = [];

  const lines =
    experienceText.split("\n");

  lines.forEach((line) => {

    const trimmed = line.trim();

    if (
      trimmed.length > 10 &&
      trimmed.length < 120
    ) {

      experience.push({

        company: trimmed,

        role: "",

        duration: "",

        description: "",
      });
    }
  });

  return experience.slice(0, 5);
};

// ================================
// EXTRACT NAME
// ================================

const extractName = (text) => {

  const lines = text.split(" ");

  return lines.slice(0, 2).join(" ");
};


// ================================
// MAIN PARSER FUNCTION
// ================================

const parseResume =
async (
  fileBuffer,
  fileName
) => {

  // EXTRACT RAW TEXT

  const rawText =
    await extractTextFromFile(

      fileBuffer,

      fileName
    );

  // NORMALIZE TEXT

  const normalizedText =
    normalizeText(rawText);

  // EXTRACT SECTIONS

  const sections =
    extractSections(rawText);

  // STRUCTURED DATA

  const extractedData = {

    name:
      extractName(normalizedText),

    email:
      extractEmail(normalizedText),

    phone:
      extractPhone(normalizedText),

    github:
      extractGithub(normalizedText),

    linkedin:
      extractLinkedin(normalizedText),

    skills:
      extractSkills(
        sections.skills
      ),

    education:
      extractEducation(
        sections.education
      ),

    projects:
      extractProjects(
        sections.projects
      ),

    experience:
      extractExperience(
        sections.experience
      ),
  };

  return {

    parsedText:
      normalizedText,

    extractedData,
  };
};

module.exports = {
  parseResume,
};