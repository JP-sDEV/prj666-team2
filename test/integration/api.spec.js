import { expect } from 'chai';
import request from 'supertest';
import { createServer } from 'http';
import { GET } from './test-route.js';

describe('API Integration Tests', () => {
  let server;

  before((done) => {
    const handler = async (req, res) => {
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

  after((done) => {
    server.close(done);
  });

  it('GET /api/test returns correct response', async () => {
    const response = await request(server).get('/').expect('Content-Type', /json/).expect(200);

    expect(response.body).to.deep.equal({
      message: 'Hello World',
    });
  });

  it('handles server errors appropriately', async () => {
    // Create a temporary handler that simulates an error
    const errorHandler = async (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    };

    const originalHandler = server._events.request;
    server._events.request = errorHandler;

    const response = await request(server).get('/').expect('Content-Type', /json/).expect(500);

    expect(response.body).to.deep.equal({
      error: 'Internal Server Error',
    });

    // Restore the original handler
    server._events.request = originalHandler;
  });
});
