import { keycloak } from '../config/keycloak';

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${keycloak.token}`,
    ...options.headers,
  };

  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error('API call failed');
  }

  return response.json();
};