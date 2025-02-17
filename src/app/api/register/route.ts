import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    // Convert email to lowercase
    const normalizedEmail = email.toLowerCase();

    if (!normalizedEmail || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const usersCollection = client.db("datasense-db").collection("users");

    // Check if user already exists using normalized email
    const existingUser = await usersCollection.findOne({ 
      email: normalizedEmail 
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user with normalized email
    const result = await usersCollection.insertOne({
      email: normalizedEmail,
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date()
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
