import { beforeAll, afterEach, afterAll } from '@jest/globals';
import { server } from '../mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
