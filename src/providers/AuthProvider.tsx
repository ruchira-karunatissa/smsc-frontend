// src/providers/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

interface AuthContextType {
  keycloak: Keycloak | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  keycloak: null,
  isAuthenticated: false
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [keycloak] = useState(() => new Keycloak({
    url: 'http://localhost:8180',
    realm: 'smsc',
    clientId: 'smsc-frontend'
  }));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init({
          onLoad: 'login-required',
          checkLoginIframe: false
        });
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Keycloak init error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initKeycloak();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ keycloak, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};