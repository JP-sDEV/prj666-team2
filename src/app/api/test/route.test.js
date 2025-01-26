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

  describe('Error Handling', () => {
    it('should handle internal server errors gracefully', async () => {
      // Mock Response.json to throw an error
      const originalJson = Response.json;
      Response.json = jest.fn().mockImplementationOnce(() => {
        throw new Error('Internal Server Error');
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Internal Server Error' });

      // Restore original implementation
      Response.json = originalJson;
    });
  });
});
