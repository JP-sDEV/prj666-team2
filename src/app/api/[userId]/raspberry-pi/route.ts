import { NextResponse } from 'next/server';
import connectDb from '../../../../lib/mongodb';
import RaspberryPi from '../../../models/raspberryPi';

export async function POST(req: Request, context: { params: { userId: string } }) {
  const params = await context.params;
  const userId = params.userId;

  try {
    const data = await req.json();
    const { raspberryPiId, serialId, name, deviceModel, location } = data;
    console.log(JSON.stringify(data, null, 2)); //expected data

    if (!raspberryPiId || !userId) {
      return NextResponse.json(
        { message: 'Raspberry Pi ID and user ID are required' },
        { status: 400 }
      );
    }

    await connectDb();

    console.log('raspberryPiId:', raspberryPiId);
    console.log('userId:', userId);

    const newDevice = new RaspberryPi({
      raspberryPiId,
      serialId,
      name: name || 'My Device',
      deviceModel: deviceModel || 'Raspberry Pi 1',
      location: location || 'My Location',
      userId,
    });

    await newDevice.save();

    return NextResponse.json(
      {
        message: 'Raspberry Pi successfully registered.',
        device: newDevice,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering Raspberry Pi:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
