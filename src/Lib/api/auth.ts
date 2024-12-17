export class AuthAPI {
    private static instance: AuthAPI;
    private isInitialized = false;
  
    static getInstance(): AuthAPI {
      if (!AuthAPI.instance) {
        AuthAPI.instance = new AuthAPI();
      }
      return AuthAPI.instance;
    }
  
    async initialize() {
      if (this.isInitialized) return;
      
      try {
        const response = await fetch('/api/auth/session');
        if (!response.ok) throw new Error('Auth initialization failed');
        
        this.isInitialized = true;
      } catch (error) {
        console.error('Auth initialization failed:', error);
        throw error;
      }
    }
  
    async login(credentials: { username: string; password: string }) {
      return fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
    }
  
    async logout() {
      return fetch('/api/auth/logout', { method: 'POST' });
    }
  
    async getSession() {
      return fetch('/api/auth/session').then(res => res.json());
    }
  }
  
  export const authApi = AuthAPI.getInstance();