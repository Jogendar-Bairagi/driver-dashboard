import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProtectedRoute = ({ children, requiredEmail }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // ✅ Check if user is logged in and has correct email
  if (!user || (requiredEmail && user.email !== requiredEmail)) {
    return <Navigate to="/" replace />; // redirect to login
  }

  return children; // authorized → render the page
};

export default ProtectedRoute;
