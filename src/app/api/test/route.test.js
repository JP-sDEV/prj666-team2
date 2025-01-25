import { GET } from './route';

describe('Test API Route', () => {
  it('should return hello world message', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response instanceof Response).toBe(true);
    expect(data).toEqual({ message: 'Hello World' });
  });
}); 
