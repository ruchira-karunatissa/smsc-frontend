import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs";
import ConfigurationPanel from './components/config/ConfigurationPanel';
import { Activity, Network, TrendingUp, Settings, AlertCircle, LogOut, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AuthProvider, useAuth } from './providers/AuthProvider';
import { ProtectedRoute } from './components/ProtectedRoute';

// NetworkNode component
const NetworkNode = ({ 
  node, 
  onNodeClick, 
  isSelected 
}: { 
  node: any; 
  onNodeClick: (node: any) => void; 
  isSelected: boolean;
}) => (
  <div 
    className={`
      p-4 rounded-lg cursor-pointer transition-all
      ${isSelected ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200'}
      border-2 hover:shadow-md
    `}
    onClick={() => onNodeClick(node)}
  >
    <div className="flex justify-between items-center">
      <span className="font-medium">{node.name}</span>
      <span className={`px-2 py-1 rounded text-sm ${
        node.status === 'active' ? 'bg-green-100 text-green-800' : 
        node.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : 
        'bg-red-100 text-red-800'
      }`}>
        {node.status}
      </span>
    </div>
    {isSelected && (
      <div className="mt-3 space-y-2 text-sm">
        <div>Uptime: {node.uptime}</div>
        <div>Messages Processed: {node.messagesProcessed}</div>
        <div>Error Rate: {node.errorRate}%</div>
      </div>
    )}
  </div>
);

// SystemMetrics component
const SystemMetrics = ({ metrics }: { metrics: any }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {Object.entries(metrics).map(([key, value]: [string, any]) => (
      <div key={key} className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">{value.label}</p>
        <p className="text-2xl font-bold">
          {value.value}
          {value.unit && <span className="text-sm ml-1">{value.unit}</span>}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${value.percentage}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

// AlertBanner component
const AlertBanner = ({ alerts }: { alerts: any[] }) => (
  <div className="space-y-2">
    {alerts.map((alert, index) => (
      <div 
        key={index}
        className={`
          p-4 rounded-lg flex items-center space-x-3
          ${alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
            alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'}
        `}
      >
        <AlertCircle className="h-5 w-5" />
        <span>{alert.message}</span>
        <span className="text-sm opacity-75">{alert.time}</span>
      </div>
    ))}
  </div>
);

// Dashboard Content Component
const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [selectedNode, setSelectedNode] = useState<any>(null);

  // Initialize with 10 data points
  const initialData = Array.from({ length: 10 }, (_, i) => ({
    time: new Date(Date.now() - (9 - i) * 5000).toLocaleTimeString(),
    messages: Math.floor(Math.random() * 1000 + 500),
    errors: Math.floor(Math.random() * 50),
  }));

  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    const timer = setInterval(() => {
      setChartData(currentData => {
        const newPoint = {
          time: new Date().toLocaleTimeString(),
          messages: Math.floor(Math.random() * 1000 + 500),
          errors: Math.floor(Math.random() * 50),
        };
        return [...currentData.slice(1), newPoint];
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const networkNodes = [
    {
      id: 1,
      name: 'SMSC Core',
      status: 'active',
      uptime: '15d 6h',
      messagesProcessed: '1.2M',
      errorRate: 0.02
    },
    {
      id: 2,
      name: 'Gateway 1',
      status: 'active',
      uptime: '10d 12h',
      messagesProcessed: '850K',
      errorRate: 0.05
    },
    {
      id: 3,
      name: 'Gateway 2',
      status: 'warning',
      uptime: '5d 8h',
      messagesProcessed: '620K',
      errorRate: 1.2
    }
  ];

  const systemMetrics = {
    cpu: {
      label: 'CPU Usage',
      value: 45,
      unit: '%',
      percentage: 45,
    },
    memory: {
      label: 'Memory Usage',
      value: 62,
      unit: '%',
      percentage: 62,
    },
    queue: {
      label: 'Queue Length',
      value: 156,
      percentage: 30,
    }
  };

  const alerts = [
    {
      severity: 'warning',
      message: 'High message queue on Gateway 2',
      time: '2 minutes ago'
    },
    {
      severity: 'critical',
      message: 'Connection timeout on backup link',
      time: '5 minutes ago'
    }
  ];

  return (
    <div className="h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <div className="border-b bg-white">
          <div className="px-4">
            <TabsList className="flex">
              <TabsTrigger value="monitoring" className="flex items-center px-6 py-3">
                <Activity className="mr-2 h-4 w-4" />
                Monitoring
              </TabsTrigger>
              <TabsTrigger value="config" className="flex items-center px-6 py-3">
                <Settings className="mr-2 h-4 w-4" />
                Configuration
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="p-4">
          <TabsContent value="monitoring" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2" />
                    Message Flow
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="messages" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="errors" 
                          stroke="#ff0000" 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Network className="mr-2" />
                    Network Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {networkNodes.map(node => (
                      <NetworkNode
                        key={node.id}
                        node={node}
                        onNodeClick={setSelectedNode}
                        isSelected={selectedNode?.id === node.id}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SystemMetrics metrics={systemMetrics} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="mr-2" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AlertBanner alerts={alerts} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config">
            <ProtectedRoute roles={['default-roles-smsc']}>
              <ConfigurationPanel />
            </ProtectedRoute>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

// Protected App Component
const ProtectedApp = () => {
  const { keycloak, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="px-4 mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">
                SMSC Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm text-gray-600">
                  {keycloak.tokenParsed?.preferred_username}
                </span>
              </div>
              <button
                onClick={() => keycloak.logout()}
                className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 rounded-md hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="container mx-auto py-6">
        <DashboardContent />
      </main>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <ProtectedApp />
    </AuthProvider>
  );
}

export default App;