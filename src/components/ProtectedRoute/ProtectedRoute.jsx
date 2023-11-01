import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn }) {
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

function ProtectedAuthRoute({ children, isLoggedIn }) {
  const location = useLocation();
  if (isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export { ProtectedRoute, ProtectedAuthRoute };
