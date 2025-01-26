import { http, HttpResponse } from 'msw';

// Define handlers for API endpoint mocking
export const handlers = [
  http.get('/api/test', () => {
    return HttpResponse.json({ message: 'Mocked Hello World' });
  }),

  // Add more handlers as needed
];
