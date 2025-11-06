import React from "react";
import "../app.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="https://cdn-icons-png.flaticon.com/128/18042/18042856.png" alt="Bus Logo" />
        </div>
        <h1 className="navbar-title">Local Area Bus Tracking</h1>
      </div>
    </nav>
  );
};

export default Navbar;
