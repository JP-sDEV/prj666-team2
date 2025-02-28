// src/lib/socket.js
import { Server } from 'socket.io';

// Store the Socket.IO server instance
let io;

// Initialize the Socket.IO server
export function initSocketServer(server) {
  if (io) {
    console.log('Socket.IO server already initialized');
    return io;
  }

  io = new Server(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000, // 60 seconds
    transports: ['websocket', 'polling'], // Enable both WebSocket and polling for better compatibility
  });

  // Connection event handler
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send initial data to the client
    sendInitialData(socket);

    // Set up heartbeat mechanism
    setupHeartbeat(socket);

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Handle error event
    socket.on('error', (error) => {
      console.error(`Socket error for client ${socket.id}:`, error);
    });
  });

  // Start sending simulated sensor data
  startSensorDataSimulation();

  console.log('Socket.IO server initialized');
  return io;
}

// Get the Socket.IO server instance
export function getSocketServer() {
  if (!io) {
    console.warn('Socket.IO server not initialized yet');
    return null;
  }
  return io;
}

// Send initial data to a client
function sendInitialData(socket) {
  const initialData = {
    temperature: generateRandomTemperature(),
    humidity: generateRandomHumidity(),
    timestamp: new Date().toISOString(),
  };

  socket.emit('initialData', initialData);
}

// Set up heartbeat mechanism
function setupHeartbeat(socket) {
  // Client pings server every 30 seconds
  socket.on('heartbeat', () => {
    socket.emit('heartbeat', { status: 'ok', timestamp: new Date().toISOString() });
  });
}

// Generate random temperature data (20-30°C)
function generateRandomTemperature() {
  return parseFloat((Math.random() * 10 + 20).toFixed(1));
}

// Generate random humidity data (30-70%)
function generateRandomHumidity() {
  return parseFloat((Math.random() * 40 + 30).toFixed(1));
}

// Start sending simulated sensor data
function startSensorDataSimulation() {
  // Send data every 3 seconds
  setInterval(() => {
    if (io) {
      const data = {
        temperature: generateRandomTemperature(),
        humidity: generateRandomHumidity(),
        timestamp: new Date().toISOString(),
      };

      io.emit('sensorData', data);
    }
  }, 3000);
}
