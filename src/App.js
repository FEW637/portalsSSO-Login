import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import ApplicationDirectory from "./ApplicationDirectory";
import Notification from "./Notification";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
      setShowNotification(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <ApplicationDirectory accessToken={localStorage.getItem('access_token')} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      {showNotification && (
        <Notification
          message="Login successful!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </Router>
  );
}

export default App;