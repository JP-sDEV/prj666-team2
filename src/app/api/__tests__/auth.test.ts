import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { createMocks } from 'node-mocks-http';
import { handler as authHandler } from '../../api/auth/[...nextauth]/route';

jest.mock('next-auth/providers/google', () => {
  return jest.fn(() => ({
    id: 'google',
    name: 'Google',
    type: 'oauth',
  }));
});

describe('Auth API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should handle GET request to [...nextauth]', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await authHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
  });

  it('should handle POST request to [...nextauth]', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        access_token: 'mock_access_token',
      },
    });

    await authHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
  });

  it('should return 400 for invalid request body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        // Missing required fields
      },
    });

    await authHandler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });
});
