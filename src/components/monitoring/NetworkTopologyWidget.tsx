// src/components/monitoring/NetworkTopologyWidget.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { Network } from 'lucide-react';

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
  type: 'core' | 'gateway';
}

interface Edge {
  source: number;
  target: number;
}

const NetworkTopologyWidget = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodes: Node[] = [
    { id: 1, x: 50, y: 100, label: 'SMSC Core', type: 'core' },
    { id: 2, x: 200, y: 50, label: 'Gateway 1', type: 'gateway' },
    { id: 3, x: 200, y: 150, label: 'Gateway 2', type: 'gateway' }
  ];

  const edges: Edge[] = [
    { source: 0, target: 1 },
    { source: 0, target: 2 }
  ];

  const getNodeColor = (type: 'core' | 'gateway') => {
    switch (type) {
      case 'core': return '#2196F3';
      case 'gateway': return '#4CAF50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Network className="mr-2" />
          Network Topology
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] relative border rounded-lg p-4">
          <svg width="100%" height="100%" viewBox="0 0 300 200">
            {edges.map((edge, index) => {
              const sourceNode = nodes[edge.source];
              const targetNode = nodes[edge.target];
              return (
                <line
                  key={`edge-${index}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke="#CBD5E0"
                  strokeWidth="2"
                />
              );
            })}
            
            {nodes.map((node) => (
              <g
                key={node.id}
                transform={`translate(${node.x},${node.y})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer"
              >
                <circle
                  r="20"
                  fill={getNodeColor(node.type)}
                  className="transition-all duration-200 hover:opacity-80"
                />
                <text
                  textAnchor="middle"
                  y="35"
                  fill="currentColor"
                  className="text-xs"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        {selectedNode && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium">{selectedNode.label}</h4>
            <p className="text-sm text-gray-600">Type: {selectedNode.type}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetworkTopologyWidget;

// src/components/monitoring/MessageFlowWidget.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FlowMetric {
  label: string;
  value: string;
}

const MessageFlowWidget = () => {
  const [flowMetrics] = useState<FlowMetric[]>([
    { label: 'Total Messages', value: '10,000' },
    { label: 'Success Rate', value: '98.5%' },
    { label: 'Average Latency', value: '45ms' }
  ]);

  const flowData = Array.from({ length: 10 }, (_, i) => ({
    time: `${i * 10}min`,
    messages: Math.floor(Math.random() * 1000 + 500)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2" />
          Message Flow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={flowData}>
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
          </LineChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          {flowMetrics.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="text-xl font-bold">{metric.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageFlowWidget;

// src/components/monitoring/AdvancedChart.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "../../components/ui/card";
import { TrendingUp } from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

type VisualizationType = 'line' | 'area' | 'scatter';
type MetricType = 'throughput' | 'latency' | 'errors';

const AdvancedChart = () => {
  const [selectedVisualization, setSelectedVisualization] = useState<VisualizationType>('line');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('throughput');

  const availableMetrics = [
    { value: 'throughput' as MetricType, label: 'Message Throughput' },
    { value: 'latency' as MetricType, label: 'Message Latency' },
    { value: 'errors' as MetricType, label: 'Error Rate' }
  ];

  const data = Array.from({ length: 20 }, (_, i) => ({
    timestamp: `${i}:00`,
    value: Math.floor(Math.random() * 100),
    extra: Math.floor(Math.random() * 50)
  }));

  const renderChart = () => {
    switch (selectedVisualization) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                fill="#8884d8" 
                stroke="#8884d8" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Scatter 
                name={selectedMetric} 
                data={data} 
                fill="#8884d8"
                dataKey="value"
              />
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2" />
          Advanced Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <select
              className="p-2 border rounded"
              value={selectedVisualization}
              onChange={(e) => setSelectedVisualization(e.target.value as VisualizationType)}
            >
              <option value="line">Line</option>
              <option value="area">Area</option>
              <option value="scatter">Scatter</option>
            </select>
            
            <select
              className="p-2 border rounded"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
            >
              {availableMetrics.map(metric => (
                <option key={metric.value} value={metric.value}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
          
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedChart;