import React from 'react';
import { Navigate } from 'react-router-dom';

// This component protects routes from unauthorized access
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is logged in

  return isAuthenticated ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
