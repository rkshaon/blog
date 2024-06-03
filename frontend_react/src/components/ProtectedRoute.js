import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, [checkAuth]);

  if (loading) {
    return <Spinner />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
