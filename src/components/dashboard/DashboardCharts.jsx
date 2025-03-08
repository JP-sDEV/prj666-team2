'use client';

import React from 'react';
import { useSocket } from '@/hooks/useSocket';
import SensorChart from './SensorChart';

const DashboardCharts = () => {
  const { isConnected, lastPong, sensorData } = useSocket();

  // Format the last heartbeat time
  const formatLastHeartbeat = () => {
    if (!lastPong) return 'No heartbeat received yet';

    const date = new Date(lastPong);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="mt-8">
      <div className="mb-6 p-4 bg-white rounded-md shadow-sm border border-gray-200">
        <div className="flex items-center mb-2">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          ></div>
          <span className="text-sm font-medium">
            {isConnected
              ? 'Connected to sensor data stream'
              : 'Disconnected from sensor data stream'}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {isConnected ? (
            <>
              <p>Receiving real-time data updates every 3 seconds</p>
              <p>Last heartbeat: {formatLastHeartbeat()}</p>
            </>
          ) : (
            <p>Attempting to reconnect to the data stream...</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SensorChart
          data={sensorData.temperature}
          title="Temperature"
          dataKey="temperature"
          color="#FF4560"
          unit="°C"
        />
        <SensorChart
          data={sensorData.humidity}
          title="Humidity"
          dataKey="humidity"
          color="#00E396"
          unit="%"
        />
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p className="mb-2">
          <strong>Note:</strong> This dashboard is currently displaying simulated sensor data. In
          production, it will connect to actual Raspberry Pi sensors.
        </p>
        <p>
          Data points shown: Temperature ({sensorData.temperature.length}), Humidity (
          {sensorData.humidity.length})
        </p>
      </div>
    </div>
  );
};

export default DashboardCharts;
