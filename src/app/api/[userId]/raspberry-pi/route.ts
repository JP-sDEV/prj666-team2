import { NextResponse } from 'next/server';
import connectDb from '../../../../lib/mongodb';
import RaspberryPi from '../../../models/raspberryPi';
import type { NextRequest } from 'next/server';
//import mongoose from 'mongoose';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const data = await request.json();
    const param = await params;
    const userId = param.userId;

    const { deviceName, deviceModel, location } = data;

    // if (!raspberryPiId || !userId) {
    //   return NextResponse.json(
    //     { message: 'Raspberry Pi ID and user ID are required' },
    //     { status: 400 }
    //   );
    // }

    await connectDb();

    const newDevice = new RaspberryPi({
      raspberryPiId: Math.random().toString(36).substring(2, 10),
      deviceName: deviceName || 'My Device',
      deviceModel: deviceModel || 'Raspberry Pi 1',
      location: location || 'My Location',
      userId,
    });

    console.log('newDevice:', newDevice.toObject());
    // {
    //   raspberryPiId: 'dovzinxr',
    //   deviceName: 'My device',
    //   deviceModel: 'Raspberry Pi 4',
    //   location: 'Living Room',
    //   _id: new ObjectId('67b242d30a1d63484de5e2f2')
    // }
    console.log('11111111111111111111111111111111:', newDevice.userId); // undefined
    console.log('11111111111111111111111111111111:', newDevice._id); //new ObjectId('67b24b416975ff889f314aef')

    try {
      await newDevice.save();
      console.log('Device saved');
    } catch (error) {
      console.error('Error saving device:' + error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

    await newDevice.save(); //---------------------CAN NOT SAVE DATA--------------------------------------------------------------

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
