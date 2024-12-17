// src/types/index.ts
export interface RetryConfig {
    max_attempts: number;
    initial_delay: number;
    max_delay: number;
    backoff_factor: number;
    retry_on: string[];
  }
  
  export interface DateTimeConfig {
    timezone: string;
    validity_period: number;
    expiry_handling: 'delete' | 'archive';
    timestamp_format: string;
  }
  
  export interface SigtranConfig {
    local_ip: string;
    local_port: number;
    remote_ip: string;
    remote_port: number;
    routing_context: number;
    asp_id: number;
    network_appearance: number;
    protocol_variant: 'itu' | 'ansi';
  }
  
  export interface MonitoringMetrics {
    cpuUsage: number;
    memoryUsage: number;
    queueLength: number;
    messageRate: number;
  }