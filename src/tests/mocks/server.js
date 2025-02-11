import { setupServer } from 'msw/node';
import { handlers } from '../../app/api/__tests__/mocks/handlers';

// Setup requests interception using the given handlers
export const server = setupServer(...handlers);
