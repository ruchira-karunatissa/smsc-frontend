// src/services/monitoring.ts
import { api } from './api';
import { MonitoringMetrics } from '../types';

export const monitoringService = {
  getMetrics: () => api.get<MonitoringMetrics>('/monitoring/metrics'),
  getTopology: () => api.get('/monitoring/topology'),
  getMessageFlow: () => api.get('/monitoring/message-flow')
};