import { NextResponse } from 'next/server';
import connectDb from '../../../../lib/mongodb';
import RaspberryPi from '../../../models/raspberryPi';
import mongoose from 'mongoose';

export async function POST(req: Request, context: { params: { userId: string } }) {
  //console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssss');

  const params = await context.params;
  const userId = params.userId;
  //console.log('User ID from params:', params.userId); //116749422716841568405 (Google Auth)

  try {
    // convert userId to ObjectId (rule in MongoDB)
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const data = await req.json();
    const { raspberryPiId, deviceName, deviceModel, location } = data;

    if (!raspberryPiId || !userObjectId) {
      return NextResponse.json(
        { message: 'Raspberry Pi ID and user ID are required' },
        { status: 400 }
      );
    }

    await connectDb();

    const existingDevice = await RaspberryPi.findOne({ raspberryPiId, userId: userObjectId });
    if (existingDevice) {
      return NextResponse.json(
        { message: 'This Raspberry Pi is already registered under your account.' },
        { status: 400 }
      );
    }

    const newDevice = new RaspberryPi({
      raspberryPiId,
      deviceName: deviceName || 'My Device',
      deviceModel: deviceModel || 'Raspberry Pi 1',
      location: location || 'My Location',
      userId: userObjectId,
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
