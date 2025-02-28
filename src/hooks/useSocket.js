'use client';

import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';

export function useSocket() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastPong, setLastPong] = useState(null);
  const [sensorData, setSensorData] = useState({
    temperature: [],
    humidity: [],
  });

  // Initialize socket connection
  useEffect(() => {
    // Create socket connection
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
    });

    // Set up event listeners
    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setIsConnected(false);
    });

    // Handle initial data
    socketInstance.on('initialData', (data) => {
      console.log('Received initial data:', data);
      setSensorData({
        temperature: [{ value: data.temperature, timestamp: data.timestamp }],
        humidity: [{ value: data.humidity, timestamp: data.timestamp }],
      });
    });

    // Handle sensor data updates
    socketInstance.on('sensorData', (data) => {
      console.log('Received sensor data:', data);
      setSensorData((prevData) => {
        // Keep only the last 10 data points for each sensor
        const newTemperature = [
          ...prevData.temperature,
          { value: data.temperature, timestamp: data.timestamp },
        ].slice(-10);
        const newHumidity = [
          ...prevData.humidity,
          { value: data.humidity, timestamp: data.timestamp },
        ].slice(-10);

        return {
          temperature: newTemperature,
          humidity: newHumidity,
        };
      });
    });

    // Handle heartbeat
    socketInstance.on('heartbeat', (data) => {
      console.log('Received heartbeat:', data);
      setLastPong(data.timestamp);
    });

    // Save socket instance
    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Send heartbeat to server
  const sendHeartbeat = useCallback(() => {
    if (socket) {
      console.log('Sending heartbeat');
      socket.emit('heartbeat');
    }
  }, [socket]);

  // Set up heartbeat interval
  useEffect(() => {
    if (!socket) return;

    const intervalId = setInterval(() => {
      sendHeartbeat();
    }, 30000); // Send heartbeat every 30 seconds

    return () => clearInterval(intervalId);
  }, [socket, sendHeartbeat]);

  return {
    socket,
    isConnected,
    lastPong,
    sensorData,
  };
}
