// src/app/api/[userid]/raspberry-pi/route.tsx

import { NextResponse } from 'next/server';
import connectDb from '../../../../lib/mongodb'; // MongoDB connection utility
import RaspberryPi from '../../../models/raspberryPi'; // Raspberry Pi model

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    const data = await req.json();
    const { raspberryPiId, deviceName, deviceModel, location } = data;

    const userId = params.userId; // Get the userId from the URL params

    // Validate required fields
    if (!raspberryPiId || !userId) {
      return NextResponse.json(
        { message: 'Raspberry Pi ID and user ID are required' },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDb();

    // Check if the Raspberry Pi ID already exists in the database
    const existingDevice = await RaspberryPi.findOne({ raspberryPiId });
    if (existingDevice) {
      return NextResponse.json({ message: 'Device ID already registered' }, { status: 400 });
    }

    // Create a new Raspberry Pi entry in the database
    const newDevice = new RaspberryPi({
      raspberryPiId,
      deviceName: deviceName || 'My Device', // Default if no name provided
      deviceModel: deviceModel || 'Raspberry Pi 1', // Default if no model provided
      location: location || 'My Location', // Default if no location provided
      userId,
    });

    await newDevice.save();

    // Return success response
    return NextResponse.json(
      {
        message: 'Raspberry Pi registered successfully.',
        device: {
          raspberryPiId,
          deviceName: deviceName || 'My Device',
          deviceModel: deviceModel || 'Raspberry Pi 1',
          location: location || 'My Location',
          userId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error registering Raspberry Pi' }, { status: 500 });
  }
}
