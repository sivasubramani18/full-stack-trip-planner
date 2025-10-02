import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // ✅ useNavigate hook

  useEffect(() => {
    const fetchPage = async () => {
      try {
        // Mock user for demo - replace with actual API call
        const mockUser = { email: "user@example.com", id: 1 };
        setUser(mockUser);
        setMessage("Welcome to your dashboard!");

        /* --- Uncomment for real authentication ---
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("No token found. Please login.");
          navigate("/login"); // ✅ navigate to login
          return;
        }

        const res = await fetch("http://localhost:5001/api/users/page", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setMessage(data.message);
          setUser(data.user);
        } else if (res.status === 401) {
          setMessage("Unauthorized. Please login again.");
          localStorage.removeItem("token");
          navigate("/login"); // ✅ navigate to login
        } else {
          const data = await res.json();
          setMessage(data.error || "Something went wrong");
        }
        */
      } catch (error) {
        console.error("Page fetch error:", error);
        setMessage("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // ✅ navigate to login
  };

  const handleStartPlanning = () => {
  navigate("/event");  // ✅ directly go to event page
};

  const handleBrowseGuides = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5001/api/guides", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        // ✅ navigate to guides with state
        navigate("/guides", { state: { guides: data } });
      } else {
        alert("Unable to fetch guides");
      }
    } catch (error) {
      console.error("Browse guides error:", error);
      alert("Network error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px 40px",
          position: "relative",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            padding: "10px 20px",
            borderRadius: "25px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)";
          }}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
          textAlign: "center",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "700",
              color: "white",
              margin: "0 0 30px 0",
              lineHeight: "1.2",
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            One app for all your travel planning needs
          </h1>

          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
              color: "rgba(255, 255, 255, 0.9)",
              margin: "0 auto 50px auto",
              lineHeight: "1.6",
              maxWidth: "600px",
            }}
          >
            Create detailed itineraries, explore user-shared guides, and manage your
            bookings seamlessly — all in one place.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            <button
              onClick={handleStartPlanning}
              style={{
                background: "#FF6B6B",
                color: "white",
                border: "none",
                padding: "16px 32px",
                borderRadius: "50px",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
                transition: "all 0.3s ease",
                minWidth: "200px",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 12px 35px rgba(255, 107, 107, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 8px 25px rgba(255, 107, 107, 0.4)";
              }}
            >
              Start planning
            </button>

            <button
              onClick={handleBrowseGuides}
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                padding: "14px 28px",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
            >
              Browse Guides →
            </button>
          </div>

          {user && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                padding: "20px",
                borderRadius: "15px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "16px",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <p style={{ margin: "0 0 10px 0", fontWeight: "600" }}>
                Welcome back!
              </p>
              <p style={{ margin: "0", opacity: "0.9" }}>{user.email}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
