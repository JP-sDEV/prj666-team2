const { jest, describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const { createServer } = require('http');
const { GET } = require('../../src/app/api/test/route');

jest.setTimeout(10000); // Increase timeout to 10 seconds

describe('API Integration Tests', () => {
  let server;

  beforeAll((done) => {
    const handler = async (res) => {
      try {
        const response = await GET();
        const data = await response.json();

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = response.status;
        res.end(JSON.stringify(data));
      } catch (error) {
        console.error('Error occurred:', error);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    };
    server = createServer(handler);
    server.listen(0, () => done());
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
  }, 10000);

  it('handles server errors appropriately', async () => {
    const mockError = new Error('Internal Server Error');
    jest.spyOn(Response, 'json').mockImplementationOnce(() => {
      throw mockError;
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
