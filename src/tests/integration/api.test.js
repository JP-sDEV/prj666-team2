import { jest, describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import request from 'supertest';
import { createServer } from 'http';
import { GET } from '../../app/api/test/route';

jest.setTimeout(10000); // Increase timeout to 10 seconds

describe('API Integration Tests', () => {
  let server;

  beforeAll(() => {
    const handler = async (req, res) => {
      try {
        const response = await GET();
        const data = await response.json();

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = response.status;
        res.end(JSON.stringify(data));
      } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    };
    server = createServer(handler);
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  it('GET /api/test returns correct response', async () => {
    const response = await request(server)
      .get('/api/test')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      message: 'Hello World',
    });
  }, 10000);

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
  }, 10000);
});
