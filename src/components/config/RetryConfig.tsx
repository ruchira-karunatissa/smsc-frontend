// src/components/config/RetryConfig.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Clock } from 'lucide-react';
import { Button } from "../../components/ui/button";

interface RetryConfigProps {
  config: {
    max_attempts: number;
    initial_delay: number;
    max_delay: number;
    backoff_factor: number;
    retry_on: string[];
  };
  onUpdate: (config: any) => void;
}

const RetryConfig: React.FC<RetryConfigProps> = ({ config, onUpdate }) => {
  const handleChange = (field: string, value: string | number) => {
    onUpdate({
      ...config,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2" />
          Retry Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Max Attempts</label>
              <Input
                type="number"
                value={config.max_attempts}
                onChange={(e) => handleChange('max_attempts', parseInt(e.target.value))}
                min={1}
                max={10}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Initial Delay (ms)</label>
              <Input
                type="number"
                value={config.initial_delay}
                onChange={(e) => handleChange('initial_delay', parseInt(e.target.value))}
                min={100}
                step={100}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Max Delay (ms)</label>
              <Input
                type="number"
                value={config.max_delay}
                onChange={(e) => handleChange('max_delay', parseInt(e.target.value))}
                min={1000}
                step={1000}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Backoff Factor</label>
              <Input
                type="number"
                value={config.backoff_factor}
                onChange={(e) => handleChange('backoff_factor', parseFloat(e.target.value))}
                min={1}
                max={5}
                step={0.1}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Retry On Events</label>
            <div className="mt-2 space-y-2">
              {['temporary_error', 'network_error', 'timeout'].map(error => (
                <label key={error} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={config.retry_on.includes(error)}
                    onChange={(e) => {
                      const newRetryOn = e.target.checked
                        ? [...config.retry_on, error]
                        : config.retry_on.filter(item => item !== error);
                      handleChange('retry_on', newRetryOn);
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{error}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// src/components/config/DateTimeConfig.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Calendar } from 'lucide-react';

interface DateTimeConfigProps {
  config: {
    timezone: string;
    validity_period: number;
    expiry_handling: 'delete' | 'archive';
    timestamp_format: string;
  };
  onUpdate: (config: any) => void;
}

const DateTimeConfig: React.FC<DateTimeConfigProps> = ({ config, onUpdate }) => {
  const handleChange = (field: string, value: any) => {
    onUpdate({
      ...config,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2" />
          DateTime Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Timezone</label>
            <Input
              value={config.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              placeholder="UTC"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Validity Period (seconds)</label>
            <Input
              type="number"
              value={config.validity_period}
              onChange={(e) => handleChange('validity_period', parseInt(e.target.value))}
              min={0}
              step={3600}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Expiry Handling</label>
            <select
              className="w-full p-2 border rounded mt-1"
              value={config.expiry_handling}
              onChange={(e) => handleChange('expiry_handling', e.target.value)}
            >
              <option value="delete">Delete</option>
              <option value="archive">Archive</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Timestamp Format</label>
            <Input
              value={config.timestamp_format}
              onChange={(e) => handleChange('timestamp_format', e.target.value)}
              placeholder="{{YYYY}}-{{MM}}-{{DD}}T{{hh}}:{{mm}}:{{ss}}Z"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// src/components/config/SigtranConfig.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Radio } from 'lucide-react';

interface SigtranConfigProps {
  config: {
    local_ip: string;
    local_port: number;
    remote_ip: string;
    remote_port: number;
    routing_context: number;
    asp_id: number;
    network_appearance: number;
    protocol_variant: 'itu' | 'ansi';
  };
  onUpdate: (config: any) => void;
}

const SigtranConfig: React.FC<SigtranConfigProps> = ({ config, onUpdate }) => {
  const handleChange = (field: string, value: any) => {
    onUpdate({
      ...config,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Radio className="mr-2" />
          Sigtran Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Local IP</label>
              <Input
                value={config.local_ip}
                onChange={(e) => handleChange('local_ip', e.target.value)}
                placeholder="127.0.0.1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Local Port</label>
              <Input
                type="number"
                value={config.local_port}
                onChange={(e) => handleChange('local_port', parseInt(e.target.value))}
                min={1}
                max={65535}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Remote IP</label>
              <Input
                value={config.remote_ip}
                onChange={(e) => handleChange('remote_ip', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Remote Port</label>
              <Input
                type="number"
                value={config.remote_port}
                onChange={(e) => handleChange('remote_port', parseInt(e.target.value))}
                min={1}
                max={65535}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Routing Context</label>
              <Input
                type="number"
                value={config.routing_context}
                onChange={(e) => handleChange('routing_context', parseInt(e.target.value))}
                min={0}
              />
            </div>
            <div>
              <label className="text-sm font-medium">ASP ID</label>
              <Input
                type="number"
                value={config.asp_id}
                onChange={(e) => handleChange('asp_id', parseInt(e.target.value))}
                min={1}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Network Appearance</label>
              <Input
                type="number"
                value={config.network_appearance}
                onChange={(e) => handleChange('network_appearance', parseInt(e.target.value))}
                min={1}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Protocol Variant</label>
              <select
                className="w-full p-2 border rounded mt-1"
                value={config.protocol_variant}
                onChange={(e) => handleChange('protocol_variant', e.target.value)}
              >
                <option value="itu">ITU</option>
                <option value="ansi">ANSI</option>
              </select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { RetryConfig, DateTimeConfig, SigtranConfig };