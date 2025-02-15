// src/app/api/[userId]/raspberry-pi/route.tsx

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { raspberryPiId, deviceName, deviceModel, location } = data;

    // 여기에 데이터를 저장하거나 처리하는 로직을 작성
    // 예: 데이터베이스에 저장

    return NextResponse.json({ message: 'Raspberry Pi registered successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error registering Raspberry Pi' }, { status: 500 });
  }
}
