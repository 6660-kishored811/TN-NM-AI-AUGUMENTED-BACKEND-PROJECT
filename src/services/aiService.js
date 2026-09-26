const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAnswer = async (question) => {
  try {
    const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
  contents: question,
});

    return {
      answer: response.text,
      source: "Google Gemini AI",
    };
  } catch (error) {
    console.error("Gemini API Error:", error.message);

    return {
      answer: "Sorry, I could not generate an answer at the moment.",
      source: "Google Gemini AI",
    };
  }
};

module.exports = {
  generateAnswer,
};