import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "Admin";

  const fetchFAQs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/faqs");
      const data = await response.json();

      if (data.success) {
        setFaqs(data.faqs);
      }
    } catch (error) {
      console.error("Failed to fetch FAQs", error);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const addFAQ = async (e) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim() || !category.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question,
          answer,
          category,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("FAQ added successfully");

        setQuestion("");
        setAnswer("");
        setCategory("");

        fetchFAQs();
      } else {
        alert(data.message || "Failed to add FAQ");
      }
    } catch (error) {
      alert("Unable to connect to server");
    }
  };

  const startEdit = (faq) => {
    setEditingId(faq._id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateFAQ = async (e) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim() || !category.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/faqs/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            question,
            answer,
            category,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("FAQ updated successfully");

        setQuestion("");
        setAnswer("");
        setCategory("");
        setEditingId(null);

        fetchFAQs();
      } else {
        alert(data.message || "Failed to update FAQ");
      }
    } catch (error) {
      alert("Unable to connect to server");
    }
  };

  const deleteFAQ = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/faqs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("FAQ deleted successfully");
        fetchFAQs();
      } else {
        alert(data.message || "Failed to delete FAQ");
      }
    } catch (error) {
      alert("Unable to connect to server");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setCategory("");
  };

  const filteredFAQs = faqs.filter((faq) => {
  const search = searchTerm.toLowerCase();

  const matchesSearch =
    faq.question.toLowerCase().includes(search) ||
    faq.answer.toLowerCase().includes(search) ||
    faq.category.toLowerCase().includes(search);

  const matchesCategory =
    selectedCategory === "All" ||
    faq.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <p className="welcome-text">
        Welcome, {userName}
    </p>

      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.reload();
        }}
      >
        Logout
      </button>

      <div className="faq-summary">

  <div className="faq-count-card">
    <h3>Total FAQs</h3>
    <p>{faqs.length}</p>
  </div>

  <div className="faq-count-card">
    <h3>Categories</h3>
    <p>
      {new Set(faqs.map((faq) => faq.category)).size}
    </p>
  </div>

</div>

      <h2>{editingId ? "Edit FAQ" : "Add New FAQ"}</h2>

      <form onSubmit={editingId ? updateFAQ : addFAQ}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <div>
          <button type="submit">
            {editingId ? "Update FAQ" : "Add FAQ"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>Existing FAQs</h2>

      <input
        type="text"
        className="faq-search"
        placeholder="Search FAQs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
  className="category-filter"
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="All">All Categories</option>

  {[...new Set(faqs.map((faq) => faq.category))].map(
    (category) => (
      <option key={category} value={category}>
        {category}
      </option>
    )
  )}
</select>

      {filteredFAQs.length === 0 ? (
        <p>No FAQs found.</p>
      ) : (
        filteredFAQs.map((faq) => (
          <div key={faq._id} className="faq-item">
            <h3>{faq.question}</h3>

            <p>{faq.answer}</p>

            <small>Category: {faq.category}</small>

            <div style={{ marginTop: "15px" }}>
              <button
                type="button"
                onClick={() => startEdit(faq)}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => deleteFAQ(faq._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;