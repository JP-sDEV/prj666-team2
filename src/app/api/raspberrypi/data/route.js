import connectToDatabase from '@/lib/mongodb';
import SensorData from '../../../models/sensorData';
import RaspberryPi from '../../../models/raspberryPi';

export async function POST(req) {
  try {
    await connectToDatabase();
    const buffer = await req.arrayBuffer();
    const binaryData = Buffer.from(buffer);

    const raspberryPiId = binaryData.readUInt32LE(0);
    const temperature = binaryData.readFloatLE(4);
    const humidity = binaryData.readFloatLE(8);
    const moisture = binaryData.readUInt8(12);
    const timestamp = new Date(binaryData.readUInt32LE(13) * 1000);

    const serialID = raspberryPiId.toString();

    // Find the RaspberryPi by serialID
    const raspberryPi = await RaspberryPi.findOne({ serialId: serialID }).lean();
    const r = await RaspberryPi.find();

    if (!raspberryPi) {
      return new Response(JSON.stringify({ message: 'RaspberryPi not found' }), { status: 404 });
    }

    // Create a new SensorData entry
    const sensorEntry = new SensorData({
      raspberryPi: raspberryPi._id,
      temperature,
      humidity,
      moisture,
      timestamp,
    });

    await sensorEntry.save();

    return new Response(JSON.stringify({ message: 'Data saved successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
