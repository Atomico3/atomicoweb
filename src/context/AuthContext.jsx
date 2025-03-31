// @ts-nocheck
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load authentication state from localStorage on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        console.log("AuthProvider initializing...");
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("Restoring auth state from localStorage:", { parsedUser, token: token.substring(0,10) + '...' });
          setUser(parsedUser);
          setIsAuthenticated(true);
        } else {
          console.log("No auth data found in localStorage");
        }
      } catch (error) {
        console.error("Error loading auth state:", error);
        // Clear potentially corrupt data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  // Login function - key issue fixed here
  const login = (userData, token) => {
    console.log("Login function called with:", { 
      userData, 
      tokenProvided: !!token 
    });
    
    try {
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      // Update state - this was the key issue
      setUser(userData);
      setIsAuthenticated(true);
      
      console.log("Auth state updated:", { userData, isAuthenticated: true });
    } catch (error) {
      console.error("Error in login function:", error);
    }
  };

  // Logout function
  const logout = () => {
    console.log("Logout function called");
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
    
    console.log("User logged out, auth state cleared");
  };

  // Debug current state
  useEffect(() => {
    console.log("Auth state changed:", { user, isAuthenticated });
  }, [user, isAuthenticated]);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
