import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import * as RaspberryPiModule from '../../../models/raspberryPi';
import type { NextRequest } from 'next/server';
import * as UserModule from '../../../models/user';
import { MongoClient } from 'mongodb';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Skip database operations if MONGODB_URI is not defined (e.g., during build)
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI not defined. Skipping database operations.');
      return NextResponse.json({ message: 'Database connection not available' }, { status: 503 });
    }

    await connectToDatabase();

    const data = await request.json();
    //const param = await params;
    //const userId = param.userId;
    const user = await UserModule.User.findById('67afaeef0559c18f82cd6fd5'); //hardcoding for now

    const newDevice = new RaspberryPiModule.RaspberryPi({
      userId: user._id,
      name: data.name,
      serialId: data.serialId,
    });

    const existingDevice = await RaspberryPiModule.RaspberryPi.findOne({ serialId: data.serialId });

    if (existingDevice) {
      return NextResponse.json({ message: 'Serial ID must be unique.' }, { status: 409 });
    }

    try {
      await newDevice.save();
      console.log('Device saved');
    } catch (error) {
      console.error('Error saving device:' + error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

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
