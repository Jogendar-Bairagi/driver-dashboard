import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, update } from "firebase/database";
import { app } from "../firebase";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const db = getDatabase(app);

const DriverDashboardTwo = () => {
  const [Status, setStatus] = useState(false);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [history, setHistory] = useState([]);

  const driverDetails = {
    name: "Naman Kumar",
    busId: "driver2",
    busNumber: "MP09 AB 5679",
    Source: "Indore",
    Destination: "Dewas",
    Status: "",
  };

  // 🔹 Use ref to persist watchId across renders
  const watchId = useRef(null);

  const startTrip = () => {
    setStatus(true);
    startLocationTracking();
  };

  const stopTrip = () => {
    setStatus(false);

    // Stop watching location
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }

    // Only update the status in Firebase
    const driverRef = ref(db, "drivers/" + driverDetails.busId);
    update(driverRef, {
      Status: "Inactive", // or "Stopped"
      timestamp: new Date().toLocaleString(),
    });
  };

  const startLocationTracking = () => {
    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lon: longitude });

          // 🔹 Update location and status in Firebase
          const driverRef = ref(db, "drivers/" + driverDetails.busId);
          update(driverRef, {
            latitude,
            longitude,
            Status: "Active",
            timestamp: new Date().toLocaleString(),
          });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      alert("Geolocation not supported by this browser.");
    }
  };

  // 🔹 Add trip to history when stopped

  
  useEffect(() => {
    if (!Status && location.lat && location.lon) {
      setHistory((prev) => [
        ...prev,
        {
          date: new Date().toLocaleDateString(),
          route: `${driverDetails.Source} - ${driverDetails.Destination}`,
          timing: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [Status]);


  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Driver Dashboard</h1>

      {/* Trip Control Card */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          margin: "20px 0",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Trip Control</h2>
        <button
          onClick={Status ? stopTrip : startTrip}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: Status ? "red" : "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {Status ? "Stop" : "Start"} Trip
        </button>
      </div>

      {/* Driver Details Card */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          margin: "20px 0",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Driver Details</h2>
        <p><strong>Name:</strong> {driverDetails.name}</p>
        <p><strong>Bus Number:</strong> {driverDetails.busNumber}</p>
        <p><strong>Latitude:</strong> {location.lat || "N/A"}</p>
        <p><strong>Longitude:</strong> {location.lon || "N/A"}</p>
      </div>

      {/* Trip History */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          marginTop: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Trip History</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", color: "#333" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Route</th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>Timing</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "10px",color: "white" }}>{item.date}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px",color: "white"  }}>{item.route}</td>
                <td style={{ border: "1px solid #ddd", padding: "10px",color: "white"  }}>{item.timing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverDashboardTwo;
