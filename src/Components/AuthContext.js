// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  const [statusCode, setStatusCode] = useState(null);

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vN2ZjMS0xMDItODgtMzctMjE5Lm5ncm9rLWZyZWUuYXBwL2FwaS9zZWxsZXIvc2lnbi1pbiIsImlhdCI6MTcyNDE5MDExOCwiZXhwIjoxNzI2NzgyMTE4LCJuYmYiOjE3MjQxOTAxMTgsImp0aSI6ImhxQUVjYnV1cjFnQmpubmciLCJzdWIiOiIxNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.oRtFSSgpvW9tz7GPmjvK95EON8zF5NVnotIgQzCZH6g';

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


