// app/api/export/route.js

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { SensorData } from '@/app/models/sensorData';

async function connectDB() {
  const DATABASE_URL = process.env.MONGO_URI || 'mongodb://localhost:27017/datasense-db';

  if (mongoose.connections[0].readyState) {
    return; // do not connect if it has already connected
  }

  await mongoose.connect(DATABASE_URL, { dbName: 'datasense-db' });
  console.log('MongoDB connected');
}
export async function GET(request) {
  const url = new URL(request.url);
  const format = url.searchParams.get('format'); // csv or json
  const fieldsParam = url.searchParams.get('fields');

  if (format !== 'csv' && format !== 'json') {
    return NextResponse.json(
      { error: 'Invalid format. Please use "csv" or "json"' },
      { status: 400 }
    );
  }

  if (!fieldsParam) {
    return NextResponse.json({ error: 'No fields selected.' }, { status: 400 });
  }

  const selectedFields = fieldsParam.split(','); // 'timestamp' and other selected fields
  await connectDB();

  const environmentData = await SensorData.find({}).select(selectedFields.join(' ')).exec();

  if (!environmentData.length) {
    return NextResponse.json({ error: 'No environment data found.' }, { status: 404 });
  }

  const today = new Date().toISOString().split('T')[0];

  if (format === 'csv') {
    const csv = convertToCSV(environmentData, selectedFields); // convert to CSV
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

function convertToCSV(data, selectedFields) {
  const header = selectedFields.join(',') + '\n';
  const rows = data.map((item) => selectedFields.map((field) => item[field]).join(',')).join('\n');
  return header + rows;
}
