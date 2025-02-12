import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { GET } from './route';
import { getServerSession } from 'next-auth';
import clientPromise from '@/lib/mongodb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Mock NextAuth
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}));

// Mock MongoDB
jest.mock('@/lib/mongodb', () => ({
  __esModule: true,
  default: {
    then: jest.fn().mockResolvedValue({
      db: () => ({
        collection: jest.fn().mockReturnValue({
          findOne: jest.fn(),
          find: jest.fn().mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            toArray: jest.fn(),
          }),
        }),
      }),
    }),
  },
}));

describe('GET /api/devices/[id]/metrics', () => {
  const mockUserId = 'user123';
  const mockDeviceId = new ObjectId().toString();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 when user is not authenticated', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(null);

    const request = new NextRequest(
      new URL(`http://localhost:3000/api/devices/${mockDeviceId}/metrics`)
    );
    const response = await GET(request, { params: { id: mockDeviceId } });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('Authentication required');
  });

  it('should return 400 for invalid device ID', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    });

    const request = new NextRequest(
      new URL('http://localhost:3000/api/devices/invalid-id/metrics')
    );
    const response = await GET(request, { params: { id: 'invalid-id' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid device ID');
  });

  it('should return 400 for invalid query parameters', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    });

    const request = new NextRequest(
      new URL(`http://localhost:3000/api/devices/${mockDeviceId}/metrics?type=invalid`)
    );
    const response = await GET(request, { params: { id: mockDeviceId } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid query parameters');
  });

  it('should return 404 when device is not found', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    });

    const mockDb = await clientPromise;
    const mockFindOne = mockDb.db().collection('devices').findOne as jest.Mock;
    mockFindOne.mockResolvedValueOnce(null);

    const request = new NextRequest(
      new URL(`http://localhost:3000/api/devices/${mockDeviceId}/metrics`)
    );
    const response = await GET(request, { params: { id: mockDeviceId } });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Device not found or unauthorized');
  });

  it('should return metrics for valid request', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { id: mockUserId },
    });

    const mockMetrics = [
      { deviceId: mockDeviceId, type: 'temperature', value: 25, timestamp: new Date() },
    ];

    const mockDb = await clientPromise;
    const mockFindOne = mockDb.db().collection('devices').findOne as jest.Mock;
    mockFindOne.mockResolvedValueOnce({ _id: mockDeviceId, userId: mockUserId });

    const mockToArray = mockDb.db().collection('metrics').find().sort({ timestamp: -1 }).limit(1000)
      .toArray as jest.Mock;
    mockToArray.mockResolvedValueOnce(mockMetrics);

    const request = new NextRequest(
      new URL(`http://localhost:3000/api/devices/${mockDeviceId}/metrics?type=temperature`)
    );
    const response = await GET(request, { params: { id: mockDeviceId } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.metrics).toEqual(mockMetrics);
  });
});
