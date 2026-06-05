const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are an expert ATS evaluator, technical recruiter, and career coach.

Analyze the given resume and return ONLY valid JSON.

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "recommendedRoles": []
}

Rules:
- ATS score must be an integer between 0 and 100.
- Return all fields.
- Return ONLY JSON.
- No markdown.
- No explanations.
`;

const analyzeResume = async (resumeData) => {
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
            max_tokens: 600,
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: `
                Candidate Information

                Name:
                ${resumeData.name || "N/A"}

                Education:
                ${resumeData.education
                            ?.map(
                                (edu) =>
                                    `${edu.degree} - ${edu.institution}`
                            )
                            .join("\n")}

                Skills:
                ${resumeData.skills
                            ?.map((skill) => skill.name)
                            .join(", ")}

                Projects:
                ${resumeData.projects
                            ?.map(
                                (project) =>
                                    `${project.title}: ${project.description}`
                            )
                            .join("\n")}

                Experience:
                ${resumeData.experience
                            ?.map(
                                (exp) =>
                                    `${exp.role} at ${exp.company}`
                            )
                            .join("\n")}

                Certifications:
                ${resumeData.certifications?.join(", ")}

                Analyze this candidate and return JSON only.
                `,
                },
            ],
        });

        const rawResponse =
            completion.choices?.[0]?.message?.content || "";

        const cleanedResponse = rawResponse
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        let parsedData;

        try {
            parsedData = JSON.parse(cleanedResponse);
        } catch (err) {
            console.error("JSON Parse Error");
            console.error(cleanedResponse);

            throw new Error("Invalid JSON response");
        }

        return {
            atsScore:
                typeof parsedData.atsScore === "number"
                    ? parsedData.atsScore
                    : 75,

            strengths:
                Array.isArray(parsedData.strengths)
                    ? parsedData.strengths
                    : [],

            weaknesses:
                Array.isArray(parsedData.weaknesses)
                    ? parsedData.weaknesses
                    : [],

            missingSkills:
                Array.isArray(parsedData.missingSkills)
                    ? parsedData.missingSkills
                    : [],

            suggestions:
                Array.isArray(parsedData.suggestions)
                    ? parsedData.suggestions
                    : [],

            recommendedRoles:
                Array.isArray(parsedData.recommendedRoles)
                    ? parsedData.recommendedRoles
                    : [],
        };

    } catch (error) {

        console.error(
            "Resume Analysis Error:",
            error.message
        );

        return {
            atsScore: 0,
            strengths: [],
            weaknesses: [
                "Failed to analyze resume"
            ],
            missingSkills: [],
            suggestions: [
                "Please try again later"
            ],
            recommendedRoles: [],
        };
    }
};

module.exports = {
    analyzeResume,
};