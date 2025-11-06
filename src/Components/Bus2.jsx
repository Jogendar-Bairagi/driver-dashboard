import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebase";

const db = getDatabase(app);

const Bus2 = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [busData, setBusData] = useState({
    name: "",
    busId: "",
    busNumber: "" ,
    Source: "Indore",
    Destination: "Dewas",
    Status:"not started",
  });
  const [location, setLocation] = useState({ lat: 22.7196, lng: 75.8577 });

  useEffect(() => {
    // Initialize map only once
    mapRef.current = L.map("map").setView([22.7196, 75.8577], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Custom bus icon
    const busIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/0/308.png",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
    });

    markerRef.current = L.marker([22.7196, 75.8577], { icon: busIcon }).addTo(
      mapRef.current
    );

    // Listen Firebase location
    const locRef = ref(db, "drivers/driver2");
    onValue(locRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.latitude && data.longitude) {
  const newLatLng = [data.latitude, data.longitude];
  setLocation({ lat: data.latitude, lng: data.longitude });
  markerRef.current.setLatLng(newLatLng);
  mapRef.current.panTo(newLatLng, { animate: true });
}
    });

    // Listen  Firebase bus details
    const detailsRef = ref(db, "drivers/driver2");
    onValue(detailsRef, (snapshot) => {
      const details = snapshot.val();
      if (details) setBusData(details);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* LEFT: Map */}
      <div id="map" style={styles.map}></div>

      {/* RIGHT: Bus Info */}
      <div style={styles.infoBox}>
        <h2 style={styles.heading}>🚌 Bus Details</h2>
        <p><strong>Bus Name:</strong> {busData.name}</p>
        <p><strong>Bus Number:</strong> {busData.busNumber}</p>
         <p><strong>Bus Id:</strong> {busData.busId}</p>
        <p><strong>Source:</strong> {busData.Source}</p>
        <p><strong>Destination:</strong> {busData.Destination}</p>
        <p><strong>Status:</strong> {busData.Status}</p>
        <p>
          <strong>Current Location:</strong>{" "}
          {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
        </p>
      </div>
    </div>
  );
};

export default Bus2;

// CSS styles (JS object)
const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  },
  map: {
    flex: 2,
    height: "100%",
    borderRight: "2px solid #ccc",
  },
  infoBox: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "15px",
    borderBottom: "2px solid #007bff",
    paddingBottom: "5px",
  },
};
