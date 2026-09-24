const { searchFAQs } = require("../services/faqService");
const FAQ = require("../models/FAQ");

const createFAQ = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    if (!question || !answer || !category) {
      return res.status(400).json({
        success: false,
        message: "Question, answer and category are required",
      });
    }

    const faq = await FAQ.create({
      question,
      answer,
      category,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create FAQ",
      error: error.message,
    });
  }
};

const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: faqs.length,
      faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQs",
      error: error.message,
    });
  }
};

const getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch FAQ",
      error: error.message,
    });
  }
};

const updateFAQ = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      {
        question,
        answer,
        category,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update FAQ",
      error: error.message,
    });
  }
};

const deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete FAQ",
      error: error.message,
    });
  }
};

const searchFAQ = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required",
      });
    }

    const faqs = await searchFAQs(keyword);

    res.status(200).json({
      success: true,
      count: faqs.length,
      faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search FAQs",
      error: error.message,
    });
  }
};

module.exports = {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  searchFAQ,
};