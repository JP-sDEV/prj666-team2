// Retrieve data for a specific device (GET)

import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const device_id = url.searchParams.get('device_id');
  const metric = url.searchParams.get('metric');
  const start = url.searchParams.get('start');
  const end = url.searchParams.get('end');
  const token = request.headers.get('Authorization');

  // Check for valid Bearer token
  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check for required query parameters
  if (!device_id || !metric || !start || !end) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    // For testing purposes, return dummy data based on the metric
    const data = {
      status: 'success',
      data: {},
    };

    // Check for the requested metric and return dummy data
    if (metric === 'temperature') {
      data.data.temperature = [
        {
          timestamp: '2024-02-01T08:00:00Z',
          value: 22.5,
          unit: 'C',
        },
      ];
    }

    if (metric === 'humidity') {
      data.data.humidity = [
        {
          timestamp: '2024-02-01T08:00:00Z',
          value: 45,
          unit: '%RH',
        },
      ];
    }

    // Return the data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
