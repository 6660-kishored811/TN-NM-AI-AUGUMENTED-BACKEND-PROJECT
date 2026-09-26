const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Generate AI answer
const generateAnswer = async (question) => {
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: question,
        config: {
          systemInstruction:
            "You are an AI FAQ Assistant. Provide clear, accurate, concise and helpful answers to user questions.",
        },
      });

      return {
        answer: response.text,
        source: "Google Gemini AI",
      };
    } catch (error) {
      lastError = error;
      console.error(
        `Gemini API Error - Attempt ${attempt}:`,
        error.message
      );

      if (attempt < 3) {
        await new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );
      }
    }
  }

  return {
    answer:
      "Sorry, I could not generate an answer at the moment. Please try again.",
    source: "Google Gemini AI",
    error: lastError?.message || "Unknown Gemini API error",
  };
};

// Generate FAQ using Gemini
const generateFAQ = async (topic) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate one FAQ for the following topic: ${topic}

Return the result in exactly this JSON format:
{
  "question": "FAQ question",
  "answer": "Clear and helpful answer",
  "category": "FAQ category"
}

Return only valid JSON.`,
    });

    let text = response.text.trim();

    // Remove markdown code fences if Gemini adds them
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const faq = JSON.parse(text);

    return {
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      source: "Google Gemini AI",
    };
  } catch (error) {
    console.error("Gemini FAQ Generation Error:", error.message);

    throw new Error("Failed to generate FAQ");
  }
};

module.exports = {
  generateAnswer,
  generateFAQ,
};