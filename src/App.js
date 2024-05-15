import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup';
import Dashboard from './Components/Dashboard';
import ResetPassword from './Components/ResetPassword';

function App() {
  // Define function to handle form submission
  const handleFormSubmit = async (userData) => {
    try {
      const response = await fetch('http://localhost:3002/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        // Handle success
        alert('User registered successfully!');
      } else {
        // Handle failure
        alert('Failed to register user. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      alert('An error occurred while registering the user.');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup onSubmit={handleFormSubmit} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;