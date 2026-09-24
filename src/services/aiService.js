const { searchFAQs } = require("./faqService");

const generateAnswer = async (question) => {
  const faqs = await searchFAQs(question);

  if (!faqs || faqs.length === 0) {
    return {
      answer: "Sorry, I could not find a relevant FAQ for your question.",
      source: "FAQ Database",
    };
  }

  const bestFAQ = faqs[0];

  return {
    answer: bestFAQ.answer,
    source: "FAQ Database",
    faqId: bestFAQ._id,
    category: bestFAQ.category,
  };
};

module.exports = {
  generateAnswer,
};