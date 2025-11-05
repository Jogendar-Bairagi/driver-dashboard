import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebase";

const Bus1 = () => {
  const [busLocation, setBusLocation] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const locationRef = ref(db, "drivers/driver1/location");

    // Listen for live updates
    const unsubscribe = onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.latitude && data.longitude) {
        setBusLocation({
          lat: data.latitude,
          lon: data.longitude,
        });
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (!busLocation) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Fetching live bus location...</p>;
  }

  return (
    <div style={styles.container}>
      {/* Map Section */}
      <div style={styles.mapContainer}>
        <iframe
          key={`${busLocation.lat},${busLocation.lon}`}
          title="Live Bus Map"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "10px" }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${busLocation.lat},${busLocation.lon}&z=15&output=embed`}
        ></iframe>
      </div>

      {/* Bus Details */}
      <div style={styles.details}>
        <h2>Bus 1 Details</h2>
        <p><strong>Route:</strong> Indore → Dewas</p>
        <p><strong>Latitude:</strong> {busLocation.lat}</p>
        <p><strong>Longitude:</strong> {busLocation.lon}</p>
        <p><strong>Updated:</strong> {new Date().toLocaleTimeString()}</p>
        <p><strong>Status:</strong> 🟢 Active</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    padding: "20px",
    gap: "20px",
  },
  mapContainer: {
    flex: 2,
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  details: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    color: "#333",
  },
};

export default Bus1;
