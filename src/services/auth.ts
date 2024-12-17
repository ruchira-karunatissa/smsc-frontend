import { api } from './api';

export const authService = {
  login: (credentials: { username: string; password: string }) => 
    api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout', {}),
  getSession: () => api.get('/auth/session')
};