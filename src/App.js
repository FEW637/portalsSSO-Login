import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import ApplicationDirectory from "./ApplicationDirectory";
import RedirectHandler from "./RedirectHandler";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <ApplicationDirectory />
            </PrivateRoute>
          }
        />
        <Route
          path="/redirect"
          element={
            <PrivateRoute>
              <RedirectHandler />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;