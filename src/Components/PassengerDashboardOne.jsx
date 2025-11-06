import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PassengerDashboardOne = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState("Indore");
  const [destination, setDestination] = useState("Dewas");
  const [showBuses, setShowBuses] = useState(false);

  const handleSearch = () => {
    setShowBuses(true);
  };

  const buses = [
    { id: 1, name: "Bus 1", time: "08:00 AM", seats: 30 },
    { id: 2, name: "Bus 2", time: "09:30 AM", seats: 25 },
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#e0e7ef",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          width: "500px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#222",
            fontWeight: "600",
          }}
        >
          Passenger Dashboard
        </h2>

        {/* Source & Destination in same row */}
       
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  <div style={{ flex: 1 }}>
    <label
      style={{
        display: "block",
        marginBottom: "5px",
        color: "#333",
        fontWeight: "500",
      }}
    >
      Source:
    </label>
    <select
      value={source}
      onChange={(e) => setSource(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #aaa",
        backgroundColor: "#f9f9f9",
        color: "#222",
        cursor: "pointer",
      }}
    >
      {["Indore", "Dewas"].map((city) => (
        <option
          key={city}
          value={city}
          disabled={city === destination} // disable if selected as destination
        >
          {city}
        </option>
      ))}
    </select>
  </div>

  <div style={{ flex: 1 }}>
    <label
      style={{
        display: "block",
        marginBottom: "5px",
        color: "#333",
        fontWeight: "500",
      }}
    >
      Destination:
    </label>
    <select
      value={destination}
      onChange={(e) => setDestination(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #aaa",
        backgroundColor: "#f9f9f9",
        color: "#222",
        cursor: "pointer",
      }}
    > {["Indore", "Dewas"].map((city) => (
        <option
          key={city}
          value={city}
          disabled={city === source} // disable if selected as source
        >
          {city}
        </option>
      ))}
    </select>
  </div>
</div>


        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Search
        </button>

        {showBuses && (
          <div style={{ marginTop: "25px" }}>
            <h3
              style={{
                marginBottom: "10px",
                color: "#111",
                fontWeight: "600",
              }}
            >
              Available Buses:
            </h3>

            {buses.map((bus) => (
              <div
                key={bus.id}
                onClick={() => navigate(`/bus${bus.id}`)}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  cursor: "pointer",
                  backgroundColor: "#fdfdfd",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#eef4ff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fdfdfd")
                }
              >
                <strong style={{ color: "#222" }}>{bus.name}</strong>
                <p style={{ margin: "6px 0", color: "#555" }}>
                  Time: {bus.time}
                </p>
                <p style={{ margin: "6px 0", color: "#555" }}>
                  Seats: {bus.seats}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerDashboardOne;
