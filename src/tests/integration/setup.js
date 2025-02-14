const { beforeAll, afterEach, afterAll } = require('@jest/globals');
const { server } = require('../mocks/server');

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
