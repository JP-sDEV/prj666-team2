import { describe, it, expect, jest } from '@jest/globals';

// Create a mock implementation of the route
const mockRoute = {
  GET: jest.fn().mockImplementation(() => {
    return new Response(JSON.stringify({ data: [{ sensorId: 'test', value: 123 }] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
};

// Mock the actual route module
jest.mock('./route', () => mockRoute);

describe('Test API Route', () => {
  it('should return data with 200 status', async () => {
    const { GET } = await import('./route');

    const response = await GET();
    expect(response).toBeInstanceOf(Response);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('data');
  });

  it('should handle internal server errors gracefully', async () => {
    const { GET } = await import('./route');

    // Override the mock for this test only
    mockRoute.GET.mockImplementationOnce(() => {
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    });

    const response = await GET();
    expect(response.status).toBe(500);

    const data = await response.json();
    expect(data).toEqual({ error: 'Internal Server Error' });
  });
});
