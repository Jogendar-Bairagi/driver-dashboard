import React, { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebase";
import "../index.css";

const AdminDashboard = () => {
  
  const [activeCount, setActiveCount] = useState(0);
   const db = getDatabase(app);
const driversRef = ref(db, "drivers");

const handleActiveCount = () => {
  onValue(driversRef, (snapshot) => {
    let count = 0;
    snapshot.forEach((driverSnap) => {
      const driverData = driverSnap.val();
      if (driverData.Status === "Active") {
        count++;
      }
    });
    setActiveCount(count);
  });
};
 const [driverNames, setDriverNames] = useState([]);

  const handleDriverNames = () => {
    const driversRef = ref(db, "drivers");

    onValue(driversRef, (snapshot) => {
      const names = [];
      snapshot.forEach((driverSnap) => {
        const driverData = driverSnap.val();
        if (driverData && driverData.name) {
          names.push(driverData.name);
        }
      });
      setDriverNames(names);
    });
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Admin Dashboard</h1>
      
<div style={cardContainerStyle}>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", margin: "0 auto", justifyContent: "center" }}>
        <div style={cardStyle}>
          <h2>🟢 Active Buses</h2>
           <h2
        style={{ cursor: "pointer", color: "black" }}
        onClick={handleActiveCount}
      >
        Click here to fetch Driver Status
      </h2>
          <p className="activeBus" style={{ fontSize: "24px" }}>{activeCount}</p>
        </div>

        <div style={cardStyle}>
          <h2>🟢 No Of Buses/Drivers</h2>
           
          <p className="activeBus" style={{ fontSize: "24px" }}>2</p>
        </div>

         <div style={cardStyle}>
          <h2  onClick={handleDriverNames}>🟢 Name Of Drivers</h2>
           
          <div  className="activeBus" style={{ fontSize: "24px" }}>
               <ul style={{ marginTop: "15px" }}>
          {driverNames.length > 0 ? (
            driverNames.map((name, index) => <li key={index}>{name}</li>)
          ) : (
            <li>No drivers found</li>
          )}
        </ul>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
};

const cardContainerStyle = {
    
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    width: "80%",
    marginTop: "20px",
  };


const cardStyle = {
   backgroundColor: "white",
    color: "black",
    borderRadius: "10px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "transform 0.2s",
    cursor: "pointer",
};

export default AdminDashboard;
