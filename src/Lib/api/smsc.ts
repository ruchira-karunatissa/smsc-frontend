const API_BASE = '/api';

export interface APIResponse<T> {
  data?: T;
  error?: string;
}

class SMSCApi {
  private async request<T>(
    endpoint: string, 
    options?: RequestInit
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Monitoring APIs
  async getMetrics() {
    return this.request('/monitoring/metrics');
  }

  async getTopology() {
    return this.request('/monitoring/topology');
  }

  async getMessageFlow() {
    return this.request('/monitoring/message-flow');
  }

  // Configuration APIs
  async getConfig(section?: string) {
    return this.request(`/config${section ? `/${section}` : ''}`);
  }

  async updateConfig(section: string, data: any) {
    return this.request(`/config/${section}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Message Management APIs
  async getMessages(params: any) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/messages?${queryString}`);
  }

  async sendMessage(data: any) {
    return this.request('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const smscApi = new SMSCApi();