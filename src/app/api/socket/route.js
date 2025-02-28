import { NextResponse } from 'next/server';
import { getSocketServer } from '@/lib/socket';

// This endpoint can be used to check the WebSocket server status
// or to trigger events on the WebSocket server from external sources
export async function GET() {
  const io = getSocketServer();

  if (!io) {
    return NextResponse.json(
      { status: 'error', message: 'WebSocket server not initialized' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: 'ok',
    message: 'WebSocket server is running',
    clients: io.engine.clientsCount,
  });
}

// This endpoint can be used to send data to all connected clients
// In the future, this can be used by the Raspberry Pi to send data
export async function POST(req) {
  try {
    const io = getSocketServer();

    if (!io) {
      return NextResponse.json(
        { status: 'error', message: 'WebSocket server not initialized' },
        { status: 500 }
      );
    }

    const data = await req.json();

    // Validate the data
    if (!data.temperature || !data.humidity) {
      return NextResponse.json(
        { status: 'error', message: 'Invalid data format. Required fields: temperature, humidity' },
        { status: 400 }
      );
    }

    // Add timestamp if not provided
    if (!data.timestamp) {
      data.timestamp = new Date().toISOString();
    }

    // Emit the data to all connected clients
    io.emit('sensorData', data);

    return NextResponse.json({
      status: 'ok',
      message: 'Data sent to all connected clients',
      clients: io.engine.clientsCount,
    });
  } catch (error) {
    console.error('Error in socket API:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}
