'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Container, Main, Section } from '@/components/craft';
import Chart from '../../components/charts/line';
import React from 'react';
import dynamic from 'next/dynamic';

// Import the DashboardCharts component with dynamic import to avoid SSR issues with WebSockets
const DashboardCharts = dynamic(() => import('@/components/dashboard/DashboardCharts'), {
  ssr: false,
  loading: () => <p>Loading charts...</p>,
});

export default function DashboardPage() {
  const temperatureData = [
    { timestamp: '2025-02-14T21:00:32.099Z', temperature: 9.77 },
    { timestamp: '2025-02-14T21:00:32.141Z', temperature: 2.81 },
    { timestamp: '2025-02-14T21:00:32.176Z', temperature: 7.18 },
    { timestamp: '2025-02-14T21:00:32.219Z', temperature: 2.97 },
    { timestamp: '2025-02-14T21:00:32.254Z', temperature: 6.45 },
  ];

  const humidityData = [
    { timestamp: '2025-02-14T21:00:32.099Z', humidity: 31.96 },
    { timestamp: '2025-02-14T21:00:32.141Z', humidity: 87.47 },
    { timestamp: '2025-02-14T21:00:32.176Z', humidity: 94.5 },
    { timestamp: '2025-02-14T21:00:32.219Z', humidity: 75.29 },
    { timestamp: '2025-02-14T21:00:32.254Z', humidity: 83.3 },
  ];

  const moistureData = [
    { timestamp: '2025-02-14T21:00:32.099Z', moisture: 9.42 },
    { timestamp: '2025-02-14T21:00:32.141Z', moisture: 61.11 },
    { timestamp: '2025-02-14T21:00:32.176Z', moisture: 69.65 },
    { timestamp: '2025-02-14T21:00:32.219Z', moisture: 74.09 },
    { timestamp: '2025-02-14T21:00:32.254Z', moisture: 65.23 },
  ];

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Main>
      <Section>
        <Container>
          <div className="py-8">
            <div className="!mt-15 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-2">Welcome, {session?.user?.name}</h2>
              <p className="text-gray-600">
                This is a protected route. You can only see this if you&apos;re logged in.
              </p>

              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">Your Account Details:</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">Email:</span> {session?.user?.email}
                  </li>
                  <li>
                    <span className="font-medium">User ID:</span> {session?.user?.id}
                  </li>
                </ul>
              </div>

              {/* Real-time sensor data charts */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Real-time Sensor Data</h3>
                <DashboardCharts />
              </div>
            </div>
          </div>
          <div>
            <Chart
              temperatureData={temperatureData}
              humidityData={humidityData}
              moistureData={moistureData}
            />
          </div>
        </Container>
      </Section>
    </Main>
  );
}
