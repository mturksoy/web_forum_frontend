// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/posts" />;
  }

  return children;
};

export default ProtectedRoute;
