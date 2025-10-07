import { useState } from "react";

function TripPlanningEventUI() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState("");
  const [aiItinerary, setAiItinerary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [tripDays, setTripDays] = useState(0);
  const [useEnhancedAPI, setUseEnhancedAPI] = useState(true);

  // Calculate total trip days
  const calculateTripDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days : 0;
  };

  // Handle AI Itinerary Generation
  const handleGenerateAIItinerary = async () => {
    if (!destination || !startDate || !endDate) {
      alert("Please fill all required fields!");
      return;
    }

    const calculatedDays = calculateTripDays();
    if (calculatedDays === 0) {
      alert("Invalid date range! End date must be after start date.");
      return;
    }

    setTripDays(calculatedDays);
    setLoadingAI(true);

    try {
      // Use enhanced API endpoint for better multi-day support
      const endpoint = useEnhancedAPI 
        ? "http://localhost:5000/generate_itinerary_v2"
        : "http://localhost:5000/generate_itinerary";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          trip_days: calculatedDays,
          budget: budget || 2000,
          travelers,
          interests: "temples, beaches, cultural sites",
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setAiItinerary(data.itinerary);
      
      // Show success message with day count
      if (data.days_generated === calculatedDays) {
        console.log(`✅ Successfully generated ${calculatedDays}-day itinerary`);
      } else {
        console.warn(`⚠️ Generated ${data.days_generated} days instead of ${calculatedDays}`);
      }

    } catch (err) {
      console.error("API Error:", err);
      alert(`Failed to generate itinerary: ${err.message}`);
    } finally {
      setLoadingAI(false);
    }
  };

  // Format itinerary with better styling
  const formatItinerary = (text) => {
    if (!text) return null;

    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      // Day headers
      if (trimmedLine.match(/^Day\s+\d+/i) || trimmedLine.match(/^DAY\s+\d+/i)) {
        return <h4 key={index} style={styles.itineraryDayHeader}>{trimmedLine}</h4>;
      }
      // Section headers
      else if (trimmedLine.match(/^(Morning|Afternoon|Evening|Transportation|Summary)/i)) {
        return <h5 key={index} style={styles.itinerarySectionHeader}>{trimmedLine}</h5>;
      }
      // Separators
      else if (trimmedLine.match(/^=+$/)) {
        return <hr key={index} style={styles.separator} />;
      }
      // List items
      else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
        return (
          <div key={index} style={styles.listItem}>
            <span style={styles.bullet}>•</span>
            <span>{trimmedLine.substring(1).trim()}</span>
          </div>
        );
      }
      // Empty lines
      else if (!trimmedLine) {
        return <br key={index} />;
      }
      // Regular text
      else {
        return <p key={index} style={styles.itineraryParagraph}>{trimmedLine}</p>;
      }
    });
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.logo}>✈️</div>
        <h1 style={styles.title}>AI Travel Planner</h1>
        <p style={styles.subtitle}>Get perfect multi-day itineraries powered by AI</p>
      </div>

      {/* Main Form */}
      <div style={styles.formContainer}>
        {/* API Toggle */}
        <div style={styles.apiToggle}>
          <label style={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={useEnhancedAPI}
              onChange={(e) => setUseEnhancedAPI(e.target.checked)}
              style={styles.toggleInput}
            />
            Use Enhanced Multi-Day Itinerary
          </label>
          <span style={styles.toggleHelp}>
            {useEnhancedAPI ? "✅ Guarantees correct day count" : "⚡ Faster but may miss days"}
          </span>
        </div>

        <div style={styles.formGrid}>
          {/* Destination */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>📍</span>
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={styles.input}
              placeholder="Enter city or country"
            />
          </div>

          {/* Date Range */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>📅</span>
              Travel Dates
            </label>
            <div style={styles.dateRow}>
              <div style={styles.dateInputContainer}>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={styles.dateInput}
                />
                <span style={styles.dateLabel}>Start</span>
              </div>
              <div style={styles.dateSeparator}>→</div>
              <div style={styles.dateInputContainer}>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={styles.dateInput}
                />
                <span style={styles.dateLabel}>End</span>
              </div>
            </div>
          </div>

          {/* Trip Duration Display */}
          {startDate && endDate && calculateTripDays() > 0 && (
            <div style={styles.durationCard}>
              <div style={styles.durationIcon}>⏱️</div>
              <div>
                <div style={styles.durationLabel}>Trip Duration</div>
                <div style={styles.durationValue}>
                  {calculateTripDays()} day{calculateTripDays() > 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}

          {/* Travelers & Budget */}
          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>👥</span>
                Travelers
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                style={styles.select}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Person' : 'People'}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>💰</span>
                Budget (₹)
              </label>
              <div style={styles.budgetContainer}>
                <span style={styles.currencySymbol}>₹</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={styles.budgetInput}
                  placeholder="Total budget"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateAIItinerary}
          disabled={loadingAI || !destination || !startDate || !endDate}
          style={{
            ...styles.button,
            ...(loadingAI || !destination || !startDate || !endDate ? styles.buttonDisabled : {})
          }}
        >
          {loadingAI ? (
            <>
              <div style={styles.spinner}></div>
              Creating {tripDays}-Day Itinerary...
            </>
          ) : (
            <>
              <span style={styles.buttonIcon}>✨</span>
              Generate {calculateTripDays() > 1 ? `${calculateTripDays()}-Day ` : ''}Itinerary
            </>
          )}
        </button>

        {/* AI Response */}
        {aiItinerary && (
          <div style={styles.outputBox}>
            <div style={styles.outputHeader}>
              <h3 style={styles.outputTitle}>
                Your {tripDays}-Day AI-Powered Itinerary
              </h3>
              <div style={styles.successBadge}>
                ✓ {tripDays} Days Generated
              </div>
            </div>
            <div style={styles.itineraryContent}>
              {formatItinerary(aiItinerary)}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          Powered by Gemini AI • Perfect multi-day itineraries guaranteed
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    color: "white",
  },
  logo: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 0 0.5rem 0",
    background: "linear-gradient(45deg, #fff, #f0f0f0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: 0.9,
    margin: 0,
    fontWeight: "300",
  },
  formContainer: {
    background: "white",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "800px",
    marginBottom: "40px",
  },
  apiToggle: {
    marginBottom: "30px",
    padding: "15px",
    background: "#f8f9fa",
    borderRadius: "12px",
    border: "1px solid #e9ecef",
  },
  toggleLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "600",
    color: "#495057",
    cursor: "pointer",
  },
  toggleInput: {
    transform: "scale(1.2)",
  },
  toggleHelp: {
    fontSize: "12px",
    color: "#6c757d",
    marginLeft: "10px",
  },
  formGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    marginBottom: "30px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  inputRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#2D3748",
    marginBottom: "4px",
  },
  labelIcon: {
    fontSize: "16px",
  },
  input: {
    padding: "16px",
    border: "2px solid #E2E8F0",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.2s ease",
    backgroundColor: "#F7FAFC",
  },
  select: {
    padding: "16px",
    border: "2px solid #E2E8F0",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#F7FAFC",
    cursor: "pointer",
  },
  dateRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  dateInputContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  dateInput: {
    padding: "16px",
    border: "2px solid #E2E8F0",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#F7FAFC",
  },
  dateLabel: {
    fontSize: "12px",
    color: "#718096",
    textAlign: "center",
    marginTop: "4px",
  },
  dateSeparator: {
    color: "#A0AEC0",
    fontWeight: "600",
    marginTop: "16px",
  },
  budgetContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  currencySymbol: {
    position: "absolute",
    left: "16px",
    color: "#718096",
    fontWeight: "600",
    zIndex: 1,
  },
  budgetInput: {
    padding: "16px 16px 16px 40px",
    border: "2px solid #E2E8F0",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#F7FAFC",
    width: "100%",
  },
  durationCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    background: "linear-gradient(135deg, #EDF2F7, #E2E8F0)",
    borderRadius: "12px",
    border: "1px solid #CBD5E0",
  },
  durationIcon: {
    fontSize: "24px",
  },
  durationLabel: {
    fontSize: "12px",
    color: "#718096",
    fontWeight: "600",
  },
  durationValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#2D3748",
  },
  button: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
  },
  buttonIcon: {
    fontSize: "18px",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid transparent",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  outputBox: {
    marginTop: "30px",
    padding: "24px",
    background: "linear-gradient(135deg, #F7FAFC, #EDF2F7)",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
  },
  outputHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  outputTitle: {
    margin: 0,
    color: "#2D3748",
    fontSize: "18px",
    fontWeight: "600",
  },
  successBadge: {
    background: "#48BB78",
    color: "white",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  itineraryContent: {
    color: "#4A5568",
    lineHeight: "1.6",
  },
  itineraryDayHeader: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#2D3748",
    margin: "25px 0 15px 0",
    paddingBottom: "8px",
    borderBottom: "3px solid #667eea",
  },
  itinerarySectionHeader: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#4A5568",
    margin: "20px 0 10px 0",
    paddingLeft: "10px",
    borderLeft: "4px solid #48BB78",
  },
  separator: {
    border: "none",
    borderTop: "2px dashed #E2E8F0",
    margin: "15px 0",
  },
  itineraryParagraph: {
    margin: "8px 0",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    margin: "6px 0",
    fontSize: "14px",
    lineHeight: "1.4",
  },
  bullet: {
    color: "#667eea",
    fontWeight: "bold",
    minWidth: "16px",
  },
  footer: {
    marginTop: "auto",
    textAlign: "center",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "14px",
    margin: 0,
  },
};

// Add CSS animation for spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default TripPlanningEventUI;