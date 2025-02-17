import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import RaspberryPi from '../../../models/raspberryPi';
import type { NextRequest } from 'next/server';
import User from '../../../models/user';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await connectToDatabase();

    const data = await request.json();
    //const param = await params;
    //const userId = param.userId;
    const user = await User.findById('67afaeef0559c18f82cd6fd5'); //hardcoding for now

    const newDevice = new RaspberryPi({
      userId: user._id,
      name: data.name,
      serialId: data.serialId,
    });

    const existingDevice = await RaspberryPi.findOne({ serialId: data.serialId });

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
