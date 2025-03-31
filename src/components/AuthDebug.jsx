import React from 'react';
import { useAuth } from '../context/AuthContext';

const AuthDebug = () => {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      zIndex: 9999
    }}>
      <h3>Auth Debug</h3>
      <div>Loading: {loading ? 'true' : 'false'}</div>
      <div>Authenticated: {isAuthenticated ? 'true' : 'false'}</div>
      <div>User: {user ? JSON.stringify(user) : 'null'}</div>
    </div>
  );
};

export default AuthDebug;
