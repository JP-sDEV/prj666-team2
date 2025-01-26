import { GET } from './route';

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

  // Example of error handling test (you'll need to implement error handling in route.js first)
  describe('Error Handling', () => {
    it('should handle internal server errors gracefully', async () => {
      // Mock implementation to simulate error
      jest.spyOn(global, 'Response').mockImplementationOnce(() => {
        throw new Error('Internal Server Error');
      });

      try {
        await GET();
      } catch (error) {
        expect(error.message).toBe('Internal Server Error');
      }

      // Restore the original implementation
      jest.restoreAllMocks();
    });
  });
});
