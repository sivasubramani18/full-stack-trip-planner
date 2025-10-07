import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Attempting login with:", { email, password: "***" });

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        alert("Login successful");
        localStorage.setItem("token", data.token);
        navigate("/page");
      } else {
        setError(data.error || data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Cannot connect to server. Is it running on port 5000?");
      } else if (err.message.includes("CORS")) {
        setError("CORS error. Server needs CORS configuration.");
      } else {
        setError(err.message || "Network error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f2fd, #f3e5f5)",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
      >
        <h2
          style={{
            marginBottom: "10px",
            color: "#1e3a8a",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          Welcome Back
        </h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "25px" }}>
          Please sign in to continue
        </p>

        {error && (
          <div
            style={{
              background: "#fdecea",
              color: "#b71c1c",
              padding: "10px 15px",
              borderRadius: "8px",
              marginBottom: "15px",
              fontSize: "14px",
              border: "1px solid #f5c2c7",
            }}
          >
            {error}
          </div>
        )}

        <div style={{ textAlign: "left", marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              color: "#374151",
              fontWeight: "600",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s",
            }}
            onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
            onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
          />
        </div>

        <div style={{ textAlign: "left", marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              color: "#374151",
              fontWeight: "600",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s",
            }}
            onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
            onBlur={(e) => (e.target.style.border = "1px solid #d1d5db")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading
              ? "linear-gradient(90deg, #9ca3af, #9ca3af)"
              : "linear-gradient(90deg, #2563eb, #1e3a8a)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 4px 14px rgba(37,99,235,0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.boxShadow = "0 6px 18px rgba(37,99,235,0.6)";
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.boxShadow = "0 4px 14px rgba(37,99,235,0.4)";
          }}
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>

        <p
          style={{
            marginTop: "25px",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          Don’t have an account?{" "}
          <span
            style={{
              color: "#2563eb",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default CreateLogin;
