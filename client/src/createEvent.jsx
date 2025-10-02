import React, { useState, useEffect } from "react";

export default function TripPlanningEventUI() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tripName, setTripName] = useState("");
  const [budget, setBudget] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");
  const [showAddActivity, setShowAddActivity] = useState(false);

  useEffect(() => {
    // Mock user data - replace with your actual auth
    const mockUser = { email: "user@example.com", id: 1 };
    setUser(mockUser);
  }, []);

  const handleLogout = () => {
    alert("Logout functionality - implement navigation to login page");
    setUser(null);
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setActivities([...activities, {
        id: Date.now(),
        name: newActivity,
        completed: false,
        time: "",
        location: ""
      }]);
      setNewActivity("");
      setShowAddActivity(false);
    }
  };

  const toggleActivity = (id) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    ));
  };

  const handleSaveTrip = () => {
    const tripData = {
      tripName,
      destination,
      startDate,
      endDate,
      budget,
      travelers,
      activities
    };
    console.log("Saving trip:", tripData);
    alert("Trip saved successfully!");
  };

  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        padding: "12px 24px",
        background: active ? "white" : "transparent",
        color: active ? "#667eea" : "rgba(255, 255, 255, 0.8)",
        border: "none",
        borderRadius: "8px 8px 0 0",
        cursor: "pointer",
        fontWeight: active ? "600" : "500",
        fontSize: "14px",
        transition: "all 0.3s ease",
        boxShadow: active ? "0 -2px 10px rgba(0,0,0,0.1)" : "none"
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          background: "linear-gradient(45deg, #667eea, #764ba2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          TravelPlan
        </div>
        
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem"
        }}>
          {user && (
            <span style={{
              color: "#333",
              fontSize: "14px",
              fontWeight: "500"
            }}>
              Welcome, {user.email.split('@')[0]}!
            </span>
          )}
          <button
            onClick={handleLogout}
            style={{
              padding: "0.75rem 1.5rem",
              background: "transparent",
              color: "#333",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "500"
            }}
          >
            Log out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* Trip Header */}
        <div style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          padding: "2rem",
          marginBottom: "2rem",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <h1 style={{
            color: "white",
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "1rem",
            textAlign: "center"
          }}>
            Plan Your Adventure
          </h1>
          <p style={{
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            fontSize: "1.1rem"
          }}>
            Create your perfect itinerary step by step
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          gap: "4px",
          marginBottom: "0",
          justifyContent: "center"
        }}>
          <TabButton 
            id="overview" 
            label="🗺️ Overview" 
            active={activeTab === "overview"} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="itinerary" 
            label="📅 Itinerary" 
            active={activeTab === "itinerary"} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="budget" 
            label="💰 Budget" 
            active={activeTab === "budget"} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="share" 
            label="👥 Share" 
            active={activeTab === "share"} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        <div style={{
          background: "white",
          borderRadius: "0 0 20px 20px",
          padding: "2.5rem",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          minHeight: "500px"
        }}>
          {activeTab === "overview" && (
            <div>
              <h2 style={{ marginBottom: "2rem", color: "#333", fontSize: "1.8rem" }}>Trip Overview</h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "#333"
                  }}>
                    Trip Name
                  </label>
                  <input
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    placeholder="My Amazing Trip"
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #e1e5e9",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "#333"
                  }}>
                    Destination
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Paris, France"
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #e1e5e9",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "#333"
                  }}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #e1e5e9",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "#333"
                  }}>
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #e1e5e9",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "#333"
                  }}>
                    Number of Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #e1e5e9",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      outline: "none",
                      background: "white"
                    }}
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    color: "#333"
                  }}>
                    Estimated Budget
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="2000"
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #e1e5e9",
                      borderRadius: "12px",
                      fontSize: "1rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "itinerary" && (
            <div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem"
              }}>
                <h2 style={{ color: "#333", fontSize: "1.8rem", margin: 0 }}>Itinerary</h2>
                <button
                  onClick={() => setShowAddActivity(true)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "500"
                  }}
                >
                  + Add Activity
                </button>
              </div>

              {showAddActivity && (
                <div style={{
                  background: "#f8f9fa",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  marginBottom: "2rem",
                  border: "2px solid #e1e5e9"
                }}>
                  <input
                    type="text"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    placeholder="Enter activity name..."
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "2px solid #e1e5e9",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                      outline: "none"
                    }}
                  />
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button
                      onClick={handleAddActivity}
                      style={{
                        padding: "0.75rem 1.5rem",
                        background: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                      }}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddActivity(false)}
                      style={{
                        padding: "0.75rem 1.5rem",
                        background: "#6c757d",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {activities.length === 0 ? (
                  <div style={{
                    textAlign: "center",
                    padding: "3rem",
                    color: "#666",
                    fontSize: "1.1rem"
                  }}>
                    No activities planned yet. Add your first activity!
                  </div>
                ) : (
                  activities.map((activity) => (
                    <div
                      key={activity.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "1.5rem",
                        background: activity.completed ? "#f8f9fa" : "white",
                        border: "2px solid #e1e5e9",
                        borderRadius: "12px",
                        textDecoration: activity.completed ? "line-through" : "none",
                        opacity: activity.completed ? 0.7 : 1
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={activity.completed}
                        onChange={() => toggleActivity(activity.id)}
                        style={{
                          marginRight: "1rem",
                          transform: "scale(1.2)"
                        }}
                      />
                      <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                        {activity.name}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "budget" && (
            <div>
              <h2 style={{ marginBottom: "2rem", color: "#333", fontSize: "1.8rem" }}>Budget Planner</h2>
              
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem"
              }}>
                <div style={{
                  background: "#e3f2fd",
                  padding: "2rem",
                  borderRadius: "12px",
                  textAlign: "center"
                }}>
                  <h3 style={{ color: "#1976d2", marginBottom: "1rem" }}>Total Budget</h3>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#1976d2" }}>
                    ${budget || "0"}
                  </div>
                </div>
                
                <div style={{
                  background: "#f3e5f5",
                  padding: "2rem",
                  borderRadius: "12px",
                  textAlign: "center"
                }}>
                  <h3 style={{ color: "#7b1fa2", marginBottom: "1rem" }}>Per Person</h3>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#7b1fa2" }}>
                    ${budget ? Math.round(budget / travelers) : "0"}
                  </div>
                </div>
                
                <div style={{
                  background: "#e8f5e8",
                  padding: "2rem",
                  borderRadius: "12px",
                  textAlign: "center"
                }}>
                  <h3 style={{ color: "#388e3c", marginBottom: "1rem" }}>Daily Budget</h3>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "#388e3c" }}>
                    ${budget && startDate && endDate ? 
                      Math.round(budget / Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))) : "0"}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "3rem" }}>
                <h3 style={{ marginBottom: "1.5rem", color: "#333" }}>Budget Categories</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {["Accommodation", "Transportation", "Food & Dining", "Activities", "Shopping", "Miscellaneous"].map((category) => (
                    <div key={category} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem",
                      background: "#f8f9fa",
                      borderRadius: "8px"
                    }}>
                      <span style={{ fontWeight: "500" }}>{category}</span>
                      <input
                        type="number"
                        placeholder="0"
                        style={{
                          width: "120px",
                          padding: "0.5rem",
                          border: "1px solid #ddd",
                          borderRadius: "6px",
                          textAlign: "right"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "share" && (
            <div>
              <h2 style={{ marginBottom: "2rem", color: "#333", fontSize: "1.8rem" }}>Share Your Trip</h2>
              
              <div style={{
                background: "#f8f9fa",
                padding: "2rem",
                borderRadius: "12px",
                textAlign: "center",
                marginBottom: "2rem"
              }}>
                <h3 style={{ marginBottom: "1rem" }}>Invite Travel Companions</h3>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    style={{
                      padding: "1rem",
                      border: "2px solid #e1e5e9",
                      borderRadius: "8px",
                      width: "300px",
                      outline: "none"
                    }}
                  />
                  <button style={{
                    padding: "1rem 2rem",
                    background: "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "500"
                  }}>
                    Send Invite
                  </button>
                </div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem"
              }}>
                <button style={{
                  padding: "1.5rem",
                  background: "#1877f2",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}>
                  Share on Facebook
                </button>
                <button style={{
                  padding: "1.5rem",
                  background: "#1da1f2",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}>
                  Share on Twitter
                </button>
                <button style={{
                  padding: "1.5rem",
                  background: "#25d366",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}>
                  Share on WhatsApp
                </button>
                <button style={{
                  padding: "1.5rem",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "500"
                }}>
                  Copy Link
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "2rem"
        }}>
          <button
            onClick={() => window.history.back()}
            style={{
              padding: "1rem 2rem",
              background: "transparent",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "500",
              backdropFilter: "blur(10px)"
            }}
          >
            ← Back
          </button>
          <button
            onClick={handleSaveTrip}
            style={{
              padding: "1rem 2rem",
              background: "linear-gradient(45deg, #ff6b6b, #ff8e53)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
              boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)"
            }}
          >
            Save Trip
          </button>
        </div>
      </div>
    </div>
  );
}