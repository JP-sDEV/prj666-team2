'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Container, Main, Section } from '@/components/craft';
import Chart from '../../components/charts/line';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedFields, setSelectedFields] = useState({
    temperature: false,
    humidity: false,
    moisture: false,
  });

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFields((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleDownload = (format: 'csv' | 'json') => {
    if (!session) {
      toast.error('Please log in to download data.');
      return;
    }

    const fieldsToInclude = Object.keys(selectedFields).filter((field) => selectedFields[field]);
    if (fieldsToInclude.length === 0) {
      toast.warn('Please select at least one data field.');
      return;
    }

    let filteredData = temperatureData.map((entry) => ({
      timestamp: entry.timestamp,
      ...(selectedFields.temperature ? { temperature: entry.temperature } : {}),
    }));

    filteredData = filteredData.map((entry, index) => ({
      ...entry,
      ...(selectedFields.humidity ? { humidity: humidityData[index]?.humidity } : {}),
      ...(selectedFields.moisture ? { moisture: moistureData[index]?.moisture } : {}),
    }));

    let fileContent;
    let fileType;
    let fileExtension;

    if (format === 'json') {
      fileContent = JSON.stringify(filteredData, null, 2);
      fileType = 'application/json';
      fileExtension = 'json';
    } else {
      // CSV
      const headers = ['timestamp', ...fieldsToInclude];
      const csvRows = [headers.join(',')];

      filteredData.forEach((row) => {
        const values = headers.map((header) => row[header] ?? '');
        csvRows.push(values.join(','));
      });

      fileContent = csvRows.join('\n');
      fileType = 'text/csv';
      fileExtension = 'csv';
    }

    setSelectedFields({
      temperature: false,
      humidity: false,
      moisture: false,
    });

    // file download
    const blob = new Blob([fileContent], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sensor_data.${fileExtension}`;
    link.click();

    toast.success('Your data has been downloaded successfully!');
    setModalOpen(false);
  };

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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Real-time Sensor Data</h3>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
                    onClick={() => setModalOpen(true)}
                  >
                    Download
                  </button>
                </div>

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

      <Dialog
        open={isModalOpen}
        onOpenChange={(isOpen) => {
          setModalOpen(isOpen);
          setSelectedFields({ temperature: false, humidity: false, moisture: false });
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Data to Download</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            {['temperature', 'humidity', 'moisture'].map((field) => (
              <label key={field} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={field}
                  checked={selectedFields[field]}
                  onChange={handleFieldChange}
                />
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            ))}
          </div>
          <DialogFooter>
            <Button
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
              onClick={() => handleDownload('csv')}
            >
              CSV
            </Button>
            <Button
              className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
              onClick={() => handleDownload('json')}
            >
              JSON
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Main>
  );
}
