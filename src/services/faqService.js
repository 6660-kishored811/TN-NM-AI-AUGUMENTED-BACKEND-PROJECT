const FAQ = require("../models/FAQ");

const searchFAQs = async (keyword) => {
  const regex = new RegExp(keyword, "i");

  return await FAQ.find({
    $or: [
      { question: regex },
      { answer: regex },
      { category: regex },
    ],
  }).sort({ createdAt: -1 });
};

module.exports = {
  searchFAQs,
};