'use server';
import connectToDatabase from '@/lib/mongodb';
import { SensorData } from '../../models/sensorData';

export async function GET() {
  try {
    await connectToDatabase();

    const data = await SensorData.find();
    console.log(data);
    return Response.json({ data: data }, { status: 200 });
  } catch (error) {
    // Create a new Response object for the error case
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
