const { generateAnswer } = require("../services/aiService");

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

module.exports = {
  askQuestion,
};