This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## DataSense Web Application

DataSense is a web application for monitoring and visualizing sensor data from Raspberry Pi devices. The application provides real-time data visualization of temperature and humidity readings.

## Features

- Real-time data visualization using WebSockets
- Temperature and humidity monitoring
- User authentication and protected routes
- Responsive dashboard interface
- Heartbeat mechanism for connection health monitoring

## Getting Started

First, run the development server with WebSocket support:

```bash
# On Windows
start-dev.bat

# Or using npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Real-time Data Visualization

The dashboard includes real-time charts that update automatically as new sensor data is received. Currently, the application uses simulated data that changes every 3 seconds. In production, it will connect to actual Raspberry Pi sensors.

### WebSocket Implementation

- Backend: Socket.IO server integrated with Next.js
- Frontend: React components with Recharts for visualization
- Data: Simulated temperature and humidity readings (20-30°C, 30-70%)
- Update frequency: Every 3 seconds
- Connection monitoring: Heartbeat mechanism every 30 seconds

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
