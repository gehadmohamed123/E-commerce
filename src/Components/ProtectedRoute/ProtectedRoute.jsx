import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ userData, isLoading, children }) {
  if (isLoading) {
    return null;
  }

  if (userData === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

