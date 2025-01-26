import { jest, describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { createServer } from 'http';
import { GET } from '../../app/api/test/route';

describe('API Integration Tests', () => {
  let server;

  beforeAll(() => {
    const handler = async (req, res) => {
      const response = await GET();
      const data = await response.json();

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = response.status;
      res.end(JSON.stringify(data));
    };
    server = createServer(handler);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('GET /api/test returns correct response', async () => {
    const response = await request(server)
      .get('/api/test')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      message: 'Hello World',
    });
  });

  it('handles server errors appropriately', async () => {
    // Mock a server error
    jest.spyOn(Response, 'json').mockImplementationOnce(() => {
      throw new Error('Internal Server Error');
    });

    const response = await request(server)
      .get('/api/test')
      .expect('Content-Type', /json/)
      .expect(500);

    expect(response.body).toEqual({
      error: 'Internal Server Error',
    });

    jest.restoreAllMocks();
  });
});
