import { jest } from '@jest/globals';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Mock NextResponse.json
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: any, init?: ResponseInit) => {
      const response = new Response(JSON.stringify(body), {
        ...init,
        headers: {
          'content-type': 'application/json',
          ...(init?.headers || {}),
        },
      });
      Object.defineProperty(response, 'json', {
        value: async () => body,
      });
      Object.defineProperty(response, 'status', {
        value: init?.status || 200,
      });
      return response;
    },
  },
}));

// Mock MongoDB connection
jest.mock('@/lib/mongodb', () => jest.fn(() => Promise.resolve()));

// Mock RaspberryPi model
jest.mock('@/models/raspberryPi', () => {
  const mockModel = jest.fn();
  mockModel.findOne = jest.fn();
  mockModel.find = jest.fn();
  return {
    __esModule: true,
    default: mockModel,
  };
});

// Import after mocks
import { POST, GET } from './route';
import RaspberryPi from '@/models/raspberryPi';
import connectDb from '@/lib/mongodb';

describe('Raspberry Pi Registration API', () => {
  const mockUserId = new mongoose.Types.ObjectId().toString();
  const mockRaspberryPiId = 'test-pi-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/[userId]/raspberry-pi', () => {
    it('should register a new Raspberry Pi device', async () => {
      const deviceData = {
        raspberryPiId: mockRaspberryPiId,
        deviceName: 'Test Device',
        userId: new mongoose.Types.ObjectId(mockUserId),
        deviceModel: 'Raspberry Pi 4',
        location: 'Test Location',
      };

      const mockInstance = {
        ...deviceData,
        save: jest.fn().mockResolvedValue(deviceData),
        toObject: jest.fn().mockReturnValue({
          ...deviceData,
          userId: deviceData.userId.toString(),
        }),
      };

      (RaspberryPi as any).findOne.mockResolvedValue(null);
      (RaspberryPi as any).mockImplementation(() => mockInstance);

      const request = new Request('http://localhost:3000/api/test-user/raspberry-pi', {
        method: 'POST',
        body: JSON.stringify(deviceData),
      });

      const response = await POST(request, { params: { userId: mockUserId } });
      const responseData = await response.json();

      expect(response.status).toBe(201);
      expect(responseData.message).toBe('Raspberry Pi registered successfully.');
      expect(responseData.device).toMatchObject({
        raspberryPiId: mockRaspberryPiId,
        deviceName: 'Test Device',
        userId: mockUserId,
      });
    });

    it('should return 400 if raspberryPiId is missing', async () => {
      const request = new Request('http://localhost:3000/api/test-user/raspberry-pi', {
        method: 'POST',
        body: JSON.stringify({
          deviceName: 'Test Device',
        }),
      });

      const response = await POST(request, { params: { userId: mockUserId } });
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.message).toBe('Raspberry Pi ID is required');
    });

    it('should prevent duplicate device registration', async () => {
      const existingDeviceData = {
        raspberryPiId: mockRaspberryPiId,
        userId: new mongoose.Types.ObjectId(mockUserId),
        deviceName: 'Existing Device',
      };

      const existingDevice = {
        ...existingDeviceData,
        save: jest.fn(),
        toObject: jest.fn().mockReturnValue({
          ...existingDeviceData,
          userId: existingDeviceData.userId.toString(),
        }),
      };

      (RaspberryPi as any).findOne.mockResolvedValue(existingDevice);

      const request = new Request('http://localhost:3000/api/test-user/raspberry-pi', {
        method: 'POST',
        body: JSON.stringify({
          raspberryPiId: mockRaspberryPiId,
          deviceName: 'Duplicate Device',
        }),
      });

      const response = await POST(request, { params: { userId: mockUserId } });
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.message).toBe('Device ID already registered');
    });

    it('should handle invalid user ID format', async () => {
      const request = new Request('http://localhost:3000/api/test-user/raspberry-pi', {
        method: 'POST',
        body: JSON.stringify({
          raspberryPiId: mockRaspberryPiId,
          deviceName: 'Test Device',
        }),
      });

      const response = await POST(request, { params: { userId: 'invalid-id' } });
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.message).toBe('Invalid user ID format');
    });
  });

  describe('GET /api/[userId]/raspberry-pi', () => {
    it("should retrieve user's devices", async () => {
      const mockDevices = [
        {
          raspberryPiId: 'device-1',
          userId: new mongoose.Types.ObjectId(mockUserId),
          deviceName: 'Device 1',
          save: jest.fn(),
          toObject: jest.fn().mockReturnValue({
            raspberryPiId: 'device-1',
            deviceName: 'Device 1',
            userId: mockUserId,
          }),
        },
        {
          raspberryPiId: 'device-2',
          userId: new mongoose.Types.ObjectId(mockUserId),
          deviceName: 'Device 2',
          save: jest.fn(),
          toObject: jest.fn().mockReturnValue({
            raspberryPiId: 'device-2',
            deviceName: 'Device 2',
            userId: mockUserId,
          }),
        },
      ];

      (RaspberryPi as any).find.mockResolvedValue(mockDevices);

      const request = new Request('http://localhost:3000/api/test-user/raspberry-pi');
      const response = await GET(request, { params: { userId: mockUserId } });
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData.devices).toHaveLength(2);
      expect(responseData.devices[0]).toHaveProperty('raspberryPiId', 'device-1');
      expect(responseData.devices[1]).toHaveProperty('raspberryPiId', 'device-2');
    });

    it('should handle invalid user ID format', async () => {
      const request = new Request('http://localhost:3000/api/test-user/raspberry-pi');
      const response = await GET(request, { params: { userId: 'invalid-id' } });
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.message).toBe('Invalid user ID format');
    });
  });
});
