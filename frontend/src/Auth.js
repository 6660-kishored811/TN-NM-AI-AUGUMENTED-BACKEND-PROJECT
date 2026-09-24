import React, { useState } from "react";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const body = isLogin
      ? {
          email,
          password,
        }
      : {
          name,
          email,
          password,
          role: "user",
        };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        if (isLogin && data.token) {
          localStorage.setItem("token", data.token);

// Save user information
localStorage.setItem("userName", data.user.name);
localStorage.setItem("role", data.user.role);

onLogin(data.user.role);
        }

        alert(
          isLogin
            ? "Login successful!"
            : "Registration successful!"
        );

        console.log(data);
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Create Account"}</h2>

      <p>
        {isLogin
          ? "Login to your account"
          : "Register a new account"}
      </p>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className="auth-switch">
        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Auth;