import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Auth from "./Auth";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || "User"
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [faqCount, setFaqCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn || role === "admin" || role === "creator") {
      return;
    }

    const fetchFAQCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/faqs"
        );

        const data = await response.json();

        if (data.success) {
          setFaqCount(data.faqs.length);
        }
      } catch (error) {
        console.error("Failed to fetch FAQ count", error);
      }
    };

    fetchFAQCount();
  }, [isLoggedIn, role]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setRole(null);
    setUserName("User");
    setQuestion("");
    setAnswer("");
    setSource("");
    setCategory("");
    setFaqCount(0);
  };

  const askQuickQuestion = async (selectedQuestion) => {
    setQuestion(selectedQuestion);
    setLoading(true);
    setAnswer("");
    setSource("");
    setCategory("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: selectedQuestion,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAnswer(
          data.error
            ? `${data.answer}\n\nDebug Error: ${data.error}`
            : data.answer
        );

        setSource(data.source || "");
        setCategory(data.category || "");
      } else {
        setAnswer(
          data.message || "Sorry, something went wrong."
        );
      }
    } catch (error) {
      console.error("AI request failed:", error);
      setAnswer("Unable to connect to the server.");
    }

    setLoading(false);
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      return;
    }

    setLoading(true);
    setAnswer("");
    setSource("");
    setCategory("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question.trim(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAnswer(
          data.error
            ? `${data.answer}\n\nDebug Error: ${data.error}`
            : data.answer
        );

        setSource(data.source || "");
        setCategory(data.category || "");
      } else {
        setAnswer(
          data.message || "Sorry, something went wrong."
        );
      }
    } catch (error) {
      console.error("AI request failed:", error);
      setAnswer("Unable to connect to the server.");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Auth
          onLogin={(userRole) => {
            setIsLoggedIn(true);
            setRole(userRole);
            setUserName(
              localStorage.getItem("userName") || "User"
            );
          }}
        />
      ) : role === "admin" || role === "creator" ? (
        <AdminDashboard />
      ) : (
        <div className="container">
          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

          <h1>AI FAQ Assistant</h1>

          <p className="welcome-text">
            Welcome, {userName}
          </p>

          <p className="subtitle">
            Ask your questions and get AI-powered answers.
          </p>

          <div className="status-badge">
            ● AI FAQ Assistant Online
          </div>

          <div className="faq-count-card">
            <h3>Total FAQs</h3>
            <p>{faqCount}</p>
          </div>

          <div className="quick-questions">
            <p>Quick Questions</p>

            <div className="quick-buttons">
              <button
                onClick={() =>
                  askQuickQuestion(
                    "What are your customer support hours?"
                  )
                }
              >
                Support Hours
              </button>

              <button
                onClick={() =>
                  askQuickQuestion(
                    "What is your refund policy?"
                  )
                }
              >
                Refund Policy
              </button>

              <button
                onClick={() =>
                  askQuickQuestion(
                    "How can I apply for admission?"
                  )
                }
              >
                Admission
              </button>
            </div>
          </div>

          <div className="question-box">
            <input
              type="text"
              placeholder="Ask your question..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askQuestion();
                }
              }}
            />

            <button
              onClick={askQuestion}
              disabled={loading}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>

            <button
              className="clear-button"
              onClick={() => {
                setQuestion("");
                setAnswer("");
                setSource("");
                setCategory("");
              }}
            >
              Clear
            </button>
          </div>

          {loading && (
            <div className="loading-text">
              AI is thinking...
            </div>
          )}

          {answer && (
            <div className="answer-box">
              <h2>Answer</h2>

              <ReactMarkdown>
                {answer}
              </ReactMarkdown>

              {source && (
                <small>
                  Source: {source}
                </small>
              )}

              {category && (
                <small>
                  Category: {category}
                </small>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;