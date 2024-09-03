// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  const [statusCode, setStatusCode] = useState(null);

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZDNjMC0xMDItODgtMzctMTYwLm5ncm9rLWZyZWUuYXBwL2FwaS9hZG1pbi9zaWduLWluIiwiaWF0IjoxNzI1MzE4NDE0LCJleHAiOjE3MjUzMjIwMTQsIm5iZiI6MTcyNTMxODQxNCwianRpIjoiWWd6WDNGaEp4cUZTTUVFdyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.nr1S_Dpblekj9JZQXWQK8KBKz22YLFrTEsA95-Soepg';

  // Function to refresh the token
  const fetchNewToken = async () => {
    try {
      // Make a request to refresh the token
      const response = await fetch(token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      });

      const result = await response.json();
      if (response.ok && result.token) {
        setAuthToken(result.token);
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, statusCode, setStatusCode, fetchNewToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


