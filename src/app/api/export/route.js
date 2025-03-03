// app/api/export/route.js

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import SensorData from '@/app/models/sensorData';

// MongoDB 연결 함수
async function connectDB() {
  const DATABASE_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/datasense-db';

  if (mongoose.connections[0].readyState) {
    return; // do not connect if it has already connected
  }

  await mongoose.connect(DATABASE_URL, { dbName: 'datasense-db' });
  console.log('MongoDB connected');
}

export async function GET(request) {
  const url = new URL(request.url); // parsing
  const format = url.searchParams.get('format'); // csv or json

  if (format !== 'csv' && format !== 'json') {
    return NextResponse.json(
      { error: 'Invalid format. Please use "csv" or "json"' },
      { status: 400 }
    );
  }

  await connectDB();

  const environmentData = await SensorData.find({})
    .select('timestamp temperature humidity moisture')
    .exec();

  if (!environmentData.length) {
    return NextResponse.json({ error: 'No environment data found.' }, { status: 404 });
  }

  const today = new Date().toISOString().split('T')[0];

  if (format === 'csv') {
    const csv = convertToCSV(environmentData); // convert to CSV
    const headers = {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename=environment_data_${today}.csv`,
    };
    return new NextResponse(csv, { headers });
  }

  if (format === 'json') {
    const headers = {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename=environment_data_${today}.json`,
    };
    return new NextResponse(JSON.stringify(environmentData), { headers });
  }
}

function convertToCSV(data) {
  const header = 'Timestamp,Temperature(°C),Humidity(%),Moisture(%)\n';
  const rows = data
    .map((item) => `${item.timestamp},${item.temperature},${item.humidity},${item.moisture}`)
    .join('\n');
  return header + rows;
}
