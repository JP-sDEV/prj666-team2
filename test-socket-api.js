// test-socket-api.js
const fetch = require('node-fetch');

// Function to generate random temperature data (20-30°C)
function generateRandomTemperature() {
  return parseFloat((Math.random() * 10 + 20).toFixed(1));
}

// Function to generate random humidity data (30-70%)
function generateRandomHumidity() {
  return parseFloat((Math.random() * 40 + 30).toFixed(1));
}

// Function to send data to the WebSocket API
async function sendData() {
  try {
    const data = {
      temperature: generateRandomTemperature(),
      humidity: generateRandomHumidity(),
      timestamp: new Date().toISOString(),
    };

    console.log('Sending data:', data);

    const response = await fetch('http://localhost:3000/api/socket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Response:', result);
  } catch (error) {
    console.error('Error sending data:', error);
  }
}

// Send data every 5 seconds
console.log('Starting to send test data to WebSocket API...');
console.log('Press Ctrl+C to stop');

// Send initial data
sendData();

// Set up interval to send data
setInterval(sendData, 5000);
