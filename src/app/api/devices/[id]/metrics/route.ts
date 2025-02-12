import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Schema for query parameters validation
const QuerySchema = z.object({
  type: z.enum(['temperature', 'humidity', 'pressure', 'battery']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Validate device ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid device ID' }, { status: 400 });
    }

    // Parse and validate query parameters
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const queryResult = QuerySchema.safeParse(searchParams);

    if (!queryResult.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: queryResult.error.errors },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Verify device belongs to user
    const device = await db.collection('devices').findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

    if (!device) {
      return NextResponse.json({ error: 'Device not found or unauthorized' }, { status: 404 });
    }

    // Build query for metrics
    const query: any = {
      deviceId: params.id,
    };

    if (queryResult.data.type) {
      query.type = queryResult.data.type;
    }

    if (queryResult.data.startDate || queryResult.data.endDate) {
      query.timestamp = {};
      if (queryResult.data.startDate) {
        query.timestamp.$gte = new Date(queryResult.data.startDate);
      }
      if (queryResult.data.endDate) {
        query.timestamp.$lte = new Date(queryResult.data.endDate);
      }
    }

    // Retrieve metrics
    const metrics = await db
      .collection('metrics')
      .find(query)
      .sort({ timestamp: -1 })
      .limit(1000)
      .toArray();

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
