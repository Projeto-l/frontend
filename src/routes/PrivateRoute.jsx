import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = () => {
  const { user, loading, isTokenExpired, logout } = useContext(AuthContext);
  const location = useLocation();
  const isCheckingToken = useRef(false);

  useEffect(() => {
    const checkToken = async () => {
      if (isCheckingToken.current) return;
      
      isCheckingToken.current = true;
      try {
        const token = localStorage.getItem('authToken');
        if (token && isTokenExpired(token)) {
          await logout();
        }
      } finally {
        isCheckingToken.current = false;
      }
    };

    checkToken();
  }, [location.pathname]);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
