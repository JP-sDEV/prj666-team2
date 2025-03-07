import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { GET } from './route.js';

describe('Test API Route', () => {
  describe('GET method', () => {
    it('should return hello world message with 200 status', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response instanceof Response).toBe(true);
      expect(response.status).toBe(200);
      expect(data).toEqual({ message: 'Hello World' });
    });

    it('should have correct content-type header', async () => {
      const response = await GET();
      const headers = Object.fromEntries(response.headers);

      expect(headers['content-type']).toMatch(/application\/json/);
    });
  });

  describe('Error Handling', () => {
    it('should handle internal server errors gracefully', async () => {
      // Mock Response.json to throw an error
      const mockError = new Error('Internal Server Error');
      jest.spyOn(Response, 'json').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await GET();

      expect(response.status).toBe(500);

      const data = await response.json();
      expect(data).toEqual({ error: 'Internal Server Error' });

      // Clean up
      jest.restoreAllMocks();
    });
  });
});
