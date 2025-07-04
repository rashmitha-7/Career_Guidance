import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('AuthContext useEffect - Checking local storage.');
    console.log('AuthContext useEffect - Stored token:', token);
    console.log('AuthContext useEffect - Stored user string:', storedUser);
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('AuthContext useEffect - Parsed user from local storage:', parsedUser);
        setIsAuthenticated(true);
        setUser(parsedUser);
        console.log('AuthContext useEffect - User set in state from local storage:', parsedUser);
      } catch (error) {
        console.error('AuthContext - Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData, token) => {
    console.log('AuthContext - Login called with:', { userData, token });
    console.log('AuthContext - userData structure:', typeof userData, userData);
    try {
      const userToStore = typeof userData === 'string' ? JSON.parse(userData) : userData;
      console.log('AuthContext - userToStore before saving:', userToStore);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userToStore));
      setIsAuthenticated(true);
      setUser(userToStore);
      console.log('AuthContext - User set in state:', userToStore);
    } catch (error) {
      console.error('AuthContext - Error in login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};