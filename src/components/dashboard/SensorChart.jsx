'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

const SensorChart = ({ data, title, dataKey, color, unit }) => {
  // Format data for the chart
  const chartData = data.map((item) => ({
    value: item.value,
    timestamp: formatTimestamp(item.timestamp),
  }));

  return (
    <div className="w-full h-full border border-gray-200 rounded-md p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-sm text-gray-500 mb-4">Real-time {title.toLowerCase()} data</div>
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} stroke="#888" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#888"
              domain={dataKey === 'temperature' ? [15, 35] : [20, 80]}
            />
            <Tooltip
              formatter={(value) => [`${value} ${unit}`, title]}
              labelFormatter={(label) => `Time: ${label}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px',
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              name={`${title} (${unit})`}
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              activeDot={{ r: 6, strokeWidth: 2 }}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {chartData.length > 0 && (
        <div className="mt-4 flex justify-between text-sm">
          <div className="text-gray-600">
            <span className="font-medium">Current:</span> {chartData[chartData.length - 1].value}{' '}
            {unit}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Min:</span>{' '}
            {Math.min(...chartData.map((d) => d.value)).toFixed(1)} {unit}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Max:</span>{' '}
            {Math.max(...chartData.map((d) => d.value)).toFixed(1)} {unit}
          </div>
        </div>
      )}
    </div>
  );
};

export default SensorChart;
