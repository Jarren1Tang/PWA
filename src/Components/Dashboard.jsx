import React from "react";
import { useNavigate } from "react-router-dom";
import "./DB.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here
    // For example, clearing authentication tokens, etc.
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/Mainlogo.png" alt="Logo" />
        </div>
        <h1 className="navbar-title">Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>
      <div className="main-container">
        <div className="body-with-border">
          <div className="box">
            <img src="/Soil2.png" alt="Soil condition" />
            <h2>Soil condition</h2>
          </div>
        </div>
        <div className="body-with-border">
          <div className="box">
            <img src="/graph.png" alt="Trends" />
            <h2>Trends</h2>
          </div>
        </div>
        <div className="body-with-border">
          <div className="box">
            <img src="/settings.png" alt="Settings" />
            <h2>Settings</h2>
          </div>
        </div>
        <div className="body-with-border">
          <div className="box">
            <img src="/Alerts.png" alt="Alerts" />
            <h2>Alerts</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;