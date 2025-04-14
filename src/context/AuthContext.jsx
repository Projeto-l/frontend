import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Converter para milissegundos
      return Date.now() >= expirationTime;
    } catch {
      return true;
    }
  };

  const login = (token) => {
    if (isTokenExpired(token)) {
      logout();
      return;
    }
    localStorage.setItem('authToken', token);
    const user = window.atob(token.split('.')[1]);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('formData');
    localStorage.removeItem('authToken');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        const user = window.atob(token.split('.')[1]);
        setUser(user);
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isTokenExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
