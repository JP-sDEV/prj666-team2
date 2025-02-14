// app/api/register/devices/route.js

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { device_id, user_id, device_name } = await request.json();
  const token = request.headers.get('Authorization');

  // Check for required fields
  if (!device_id || !user_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Check for valid token
  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // return Dummy object for testing
    return NextResponse.json(
      { status: 'success', message: 'Device registered successfully' },
      { status: 201 }
    );

    //fix here later!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // const response = await axios.post(
    //
    //   'http://example.com/api/register/devices',
    //   {
    //     device_id,
    //     user_id,
    //     device_name: device_name || device_id,
    //   },
    //   {
    //     headers: {
    //       Authorization: token,
    //     },
    //   }
    // );

    // return NextResponse.json(
    //   { status: 'success', message: 'Device registered successfully' },
    //   { status: 201 }
    // );
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
