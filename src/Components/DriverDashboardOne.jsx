import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const db = getDatabase(app);

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
});

const DriverDashboardOne = () => {
  const [tripActive, setTripActive] = useState(false);
  const [location, setLocation] = useState({ lat: null, lon: null, address: "" });
  const [error, setError] = useState("");
  const [tripHistory, setTripHistory] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const watchId = useRef(null);

  const driver = {
    name: "Ramesh Kumar",
    busNumber: "MH-12 AB 2345",
    source: "Indore",
    destination: "Dewas",
  };

  // Load previous trip history
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("tripHistory")) || [];
    setTripHistory(storedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem("tripHistory", JSON.stringify(tripHistory));
  }, [tripHistory]);

  // Fetch readable address
  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setLocation((prev) => ({
          ...prev,
          address: data.display_name,
        }));
      }
    } catch (err) {
      console.error("Error fetching address:", err);
      setLocation((prev) => ({ ...prev, address: "Unable to fetch address" }));
    }
  };

  const handleToggle = () => {
    if (!tripActive) {
      // Start trip
      setStartTime(new Date());
      if (navigator.geolocation) {
        watchId.current = navigator.geolocation.watchPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setLocation({ lat, lon, address: "Fetching address..." });
            setError("");
            await fetchAddress(lat, lon);
          },
          (err) => {
            setError("Unable to get live location");
            console.error(err);
          },
          { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );
      } else {
        setError("Geolocation not supported by this browser.");
      }
    } else {
      // Stop trip
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }

      const endTime = new Date();
      const tripRecord = {
        date: startTime.toLocaleDateString(),
        startTime: startTime.toLocaleTimeString(),
        endTime: endTime.toLocaleTimeString(),
        route: location.address || "Not available",
      };

      setTripHistory((prev) => [tripRecord, ...prev]);
      setLocation({ lat: null, lon: null, address: "" });
    }

    setTripActive((prev) => !prev);
  };

  // Send location to Firebase
  const sendLocationToDatabase = (lat, lon) => {
    set(ref(db, "drivers/driver1/location"), {
      latitude: lat,
      longitude: lon,
    });
  };

  // Update Firebase when location changes
  useEffect(() => {
    if (location.lat && location.lon) {
      sendLocationToDatabase(location.lat, location.lon);
    }
  }, [location]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* Trip Control */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Trip Control</h2>
        <p>
          Status: <strong>{tripActive ? "Running" : "Stopped"}</strong>
        </p>
        <button
          onClick={handleToggle}
          style={{
            ...styles.button,
            backgroundColor: tripActive ? "#d9534f" : "#5cb85c",
          }}
        >
          {tripActive ? "Stop" : "Start"}
        </button>
      </div>

      {/* Driver Details + Dynamic Map */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Driver Details</h2>
        <p><strong>Name:</strong> {driver.name}</p>
        <p><strong>Bus Number:</strong> {driver.busNumber}</p>
        <p><strong>Route:</strong> {driver.source} → {driver.destination}</p>

        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : location.lat && location.lon ? (
          <>
            <p><strong>Coordinates:</strong></p>
            <p>Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}</p>
            <p><strong>Address:</strong></p>
            <p style={{ color: "#444" }}>{location.address}</p>

            <div style={styles.mapContainer}>
              <MapContainer
                center={[location.lat, location.lon]}
                zoom={15}
                style={{ height: "200px", width: "100%", borderRadius: "10px" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[location.lat, location.lon]} icon={busIcon}>
                  <Popup>Bus Location: {driver.busNumber}</Popup>
                </Marker>
                <MapUpdater position={[location.lat, location.lon]} />
              </MapContainer>
            </div>
          </>
        ) : (
          <p>Waiting for live location...</p>
        )}
      </div>

      {/* Trip History */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Trip History</h2>
        {tripHistory.length === 0 ? (
          <p>No trips recorded yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Route</th>
                <th>Timing</th>
              </tr>
            </thead>
            <tbody>
              {tripHistory.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.date}</td>
                  <td>{trip.route}</td>
                  <td>
                    {trip.startTime} - {trip.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Map auto-update component
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
};

// Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "30px",
    flexWrap: "wrap",
    padding: "40px",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
  },
  card: {
    backgroundColor: "#fff",
    padding: "25px 30px",
    color: "#333",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "350px",
    overflowX: "auto",
  },
  heading: {
    marginBottom: "15px",
    borderBottom: "2px solid #007bff",
    paddingBottom: "8px",
    color: "#333",
  },
  button: {
    border: "none",
    padding: "10px 25px",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  mapContainer: {
    marginTop: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
};

export default DriverDashboardOne;
