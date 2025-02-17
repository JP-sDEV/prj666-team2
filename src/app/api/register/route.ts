import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import clientPromise from '@/lib/mongodb';
import { MongoClient } from 'mongodb';

export async function POST(req: Request) {
  let client: MongoClient | null = null;

  try {
    const { email, password, firstName, lastName } = await req.json();
    const normalizedEmail = email.toLowerCase();

    if (!normalizedEmail || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    client = await clientPromise;
    const db = client.db('datasense-db');
    const users = db.collection('users');

    const hashedPassword = await hash(password, 12);

    try {
      const result = await users.insertOne({
        email: normalizedEmail,
        password: hashedPassword,
        firstName,
        lastName,
        createdAt: new Date(),
      });

      if (!result.acknowledged) {
        throw new Error('Failed to create user');
      }

      return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error: any) {
      if (error.code === 11000) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
      }
      throw error;
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create user' },
      { status: 500 }
    );
  }
}
