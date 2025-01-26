import { http, HttpResponse } from 'msw';

// Define handlers for API endpoint mocking
export const handlers = [
  http.get('http://127.0.0.1:*/api/test', () => {
    return HttpResponse.json({ message: 'Hello World' });
  }),

  // Add more handlers as needed
];
