import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { authOptions } from '@/app/api/auth/auth.config';

// Schema for query parameters validation
const QuerySchema = z.object({
  metric: z
    .string()
    .default('temperature')
    .transform((str) => str.split(',')),
  start: z.string().datetime().optional(),
  end: z.string().datetime().optional(),
});

// Metric units mapping
const METRIC_UNITS: Record<string, string> = {
  temperature: 'C',
  humidity: '%RH',
  pressure: 'hPa',
  moisture: '%',
};

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { status: 'error', error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate device ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ status: 'error', error: 'Invalid device ID' }, { status: 400 });
    }

    // Parse and validate query parameters
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const queryResult = QuerySchema.safeParse(searchParams);

    if (!queryResult.success) {
      return NextResponse.json(
        {
          status: 'error',
          error: 'Invalid query parameters',
          details: queryResult.error.errors,
        },
        { status: 400 }
      );
    }

    // Set default date range if not provided (last 24 hours)
    const end = queryResult.data.end ? new Date(queryResult.data.end) : new Date();
    const start = queryResult.data.start
      ? new Date(queryResult.data.start)
      : new Date(end.getTime() - 24 * 60 * 60 * 1000);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Verify device belongs to user
    const device = await db.collection('devices').findOne({
      _id: new ObjectId(params.id),
      userId: session.user.id,
    });

    if (!device) {
      return NextResponse.json(
        { status: 'error', error: 'Device not found or unauthorized' },
        { status: 404 }
      );
    }

    // Build query for metrics
    const query = {
      deviceId: params.id,
      type: { $in: queryResult.data.metric },
      timestamp: {
        $gte: start,
        $lte: end,
      },
    };

    // Retrieve metrics
    const metrics = await db
      .collection('metrics')
      .find(query)
      .sort({ timestamp: 1 })
      .limit(1000)
      .toArray();

    // Transform metrics into required format
    const data: Record<string, any> = {};
    queryResult.data.metric.forEach((metricType) => {
      data[metricType] = metrics
        .filter((m) => m.type === metricType)
        .map((m) => ({
          timestamp: m.timestamp.toISOString(),
          value: m.value,
          unit: METRIC_UNITS[metricType] || '',
        }));
    });

    return NextResponse.json({
      status: 'success',
      data,
    });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json({ status: 'error', error: 'Internal server error' }, { status: 500 });
  }
}
