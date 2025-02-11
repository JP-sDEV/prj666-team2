import { http, HttpResponse } from 'msw';

// Define handlers for API endpoint mocking
export const handlers = [
  http.get('/api/test', () => {
    return HttpResponse.json({ message: 'Hello World' }, { status: 200 });
  }),

  // Add more handlers as needed
];
