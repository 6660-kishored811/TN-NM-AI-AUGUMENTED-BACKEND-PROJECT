const {
  generateAnswer,
  generateFAQ,
} = require("../services/aiService");

const FAQ = require("../models/FAQ");

// Ask AI Question
const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const result = await generateAnswer(question);

    res.status(200).json({
      success: true,
      question,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process question",
      error: error.message,
    });
  }
};

// Generate FAQ using Gemini AI and save to MongoDB
const generateFAQQuestion = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    // Generate FAQ using Gemini
    const result = await generateFAQ(topic);

    // Save FAQ to MongoDB
    const faq = await FAQ.create({
      question: result.question,
      answer: result.answer,
      category: result.category,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "FAQ generated and saved successfully",
      faq: {
        id: faq._id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        createdBy: faq.createdBy,
      },
    });
  } catch (error) {
    console.error("Generate FAQ Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate and save FAQ",
      error: error.message,
    });
  }
};

module.exports = {
  askQuestion,
  generateFAQQuestion,
};