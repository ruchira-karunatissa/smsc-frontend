export const environment = {
    production: import.meta.env.PROD,
    apiUrl: import.meta.env.VITE_API_URL || '/api',
    auth: {
      keycloak: {
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
      }
    }
  };

  // .env.development
VITE_API_URL=http://localhost:8080/api
VITE_KEYCLOAK_URL=http://localhost:8180/auth
VITE_KEYCLOAK_REALM=smsc
VITE_KEYCLOAK_CLIENT_ID=smsc-frontend

// .env.production
VITE_API_URL=/api
VITE_KEYCLOAK_URL=/auth
VITE_KEYCLOAK_REALM=smsc
VITE_KEYCLOAK_CLIENT_ID=smsc-frontend