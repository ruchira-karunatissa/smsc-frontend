import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "../card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { Clock, Calendar, Network } from 'lucide-react';

interface RetryConfigType {
  max_attempts: number;
  initial_delay: number;
  max_delay: number;
  retry_on: string[];
}

interface DateTimeConfigType {
  timezone: string;
  validity_period: number;
  expiry_handling: 'delete' | 'archive';
}

interface SigtranConfigType {
  local_ip: string;
  local_port: number;
  remote_ip: string;
  remote_port: number;
  protocol_variant: string;
  network_appearance: number;
  routing_context: number;
  asp_id: number;
}

interface ConfigType {
  retry: RetryConfigType;
  datetime: DateTimeConfigType;
  sigtran: SigtranConfigType;
}

const RetryConfig = ({ config, onUpdate }: { config: RetryConfigType; onUpdate: (config: RetryConfigType) => void }) => {
  return (
    <div className="p-4">
      <div className="w-[500px]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Max Attempts</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.max_attempts}
              onChange={(e) => onUpdate({ ...config, max_attempts: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Initial Delay (ms)</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.initial_delay}
              onChange={(e) => onUpdate({ ...config, initial_delay: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Delay (ms)</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.max_delay}
              onChange={(e) => onUpdate({ ...config, max_delay: parseInt(e.target.value) })}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Retry Events</label>
          <div className="space-y-1">
            {['temporary_error', 'network_error', 'timeout'].map(error => (
              <label key={error} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={config.retry_on.includes(error)}
                  onChange={(e) => {
                    const newRetryOn = e.target.checked
                      ? [...config.retry_on, error]
                      : config.retry_on.filter(item => item !== error);
                    onUpdate({ ...config, retry_on: newRetryOn });
                  }}
                />
                {error}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DateTimeConfig = ({ config, onUpdate }: { config: DateTimeConfigType; onUpdate: (config: DateTimeConfigType) => void }) => {
  return (
    <div className="p-4">
      <div className="w-[500px]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Timezone</label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.timezone}
              onChange={(e) => onUpdate({ ...config, timezone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Validity Period (sec)</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.validity_period}
              onChange={(e) => onUpdate({ ...config, validity_period: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expiry Handling</label>
            <select
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.expiry_handling}
              onChange={(e) => onUpdate({ ...config, expiry_handling: e.target.value as 'delete' | 'archive' })}
            >
              <option value="delete">Delete</option>
              <option value="archive">Archive</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const SigtranConfig = ({ config, onUpdate }: { config: SigtranConfigType; onUpdate: (config: SigtranConfigType) => void }) => {
  return (
    <div className="p-4">
      <div className="w-[500px]">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Local IP</label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.local_ip}
              onChange={(e) => onUpdate({ ...config, local_ip: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Local Port</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.local_port}
              onChange={(e) => onUpdate({ ...config, local_port: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Remote IP</label>
            <input
              type="text"
              className="w-full px-3 py-1.5 border rounded text-sm"
              placeholder="Enter remote IP"
              value={config.remote_ip}
              onChange={(e) => onUpdate({ ...config, remote_ip: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Remote Port</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.remote_port}
              onChange={(e) => onUpdate({ ...config, remote_port: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Protocol Variant</label>
            <select
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.protocol_variant}
              onChange={(e) => onUpdate({ ...config, protocol_variant: e.target.value })}
            >
              <option value="ITU">ITU</option>
              <option value="ANSI">ANSI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Network Appearance</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.network_appearance}
              onChange={(e) => onUpdate({ ...config, network_appearance: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Routing Context</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.routing_context}
              onChange={(e) => onUpdate({ ...config, routing_context: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ASP ID</label>
            <input
              type="number"
              className="w-full px-3 py-1.5 border rounded text-sm"
              value={config.asp_id}
              onChange={(e) => onUpdate({ ...config, asp_id: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfigurationPanel: React.FC = () => {
  const [configTab, setConfigTab] = useState('sigtran');
  const [config, setConfig] = useState<ConfigType>({
    retry: {
      max_attempts: 3,
      initial_delay: 1000,
      max_delay: 30000,
      retry_on: ['temporary_error', 'network_error']
    },
    datetime: {
      timezone: 'UTC',
      validity_period: 86400,
      expiry_handling: 'delete'
    },
    sigtran: {
      local_ip: '127.0.0.1',
      local_port: 2905,
      remote_ip: '',
      remote_port: 2905,
      protocol_variant: 'ITU',
      network_appearance: 1,
      routing_context: 1,
      asp_id: 1
    }
  });

  const handleConfigUpdate = (section: keyof ConfigType, newConfig: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: newConfig
    }));
  };

  return (
    <div className="w-fit bg-white rounded-lg shadow">
      <Tabs value={configTab} onValueChange={setConfigTab}>
        <div className="border-b">
          <TabsList className="flex">
            <TabsTrigger 
              value="retry" 
              className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              <Clock className="w-4 h-4 mr-2" />
              Retry Settings
            </TabsTrigger>
            <TabsTrigger 
              value="datetime" 
              className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              <Calendar className="w-4 h-4 mr-2" />
              DateTime Settings
            </TabsTrigger>
            <TabsTrigger 
              value="sigtran" 
              className="px-4 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
            >
              <Network className="w-4 h-4 mr-2" />
              Sigtran Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="retry">
          <RetryConfig
            config={config.retry}
            onUpdate={(newConfig) => handleConfigUpdate('retry', newConfig)}
          />
        </TabsContent>

        <TabsContent value="datetime">
          <DateTimeConfig
            config={config.datetime}
            onUpdate={(newConfig) => handleConfigUpdate('datetime', newConfig)}
          />
        </TabsContent>

        <TabsContent value="sigtran">
          <SigtranConfig
            config={config.sigtran}
            onUpdate={(newConfig) => handleConfigUpdate('sigtran', newConfig)}
          />
        </TabsContent>
      </Tabs>

      <div className="flex px-4 py-3 border-t">
        <button
          className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800 mr-3"
          onClick={() => console.log('Reset to defaults')}
        >
          Reset to Defaults
        </button>
        <button
          className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => console.log('Save changes', config)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ConfigurationPanel;