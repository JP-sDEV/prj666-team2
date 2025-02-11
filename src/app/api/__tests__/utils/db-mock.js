// Mock database utility for testing
export class MockDatabase {
  constructor() {
    this.data = new Map();
  }

  async query(sql, params) {
    // Simulate database queries
    return Promise.resolve({ rows: [] });
  }

  async connect() {
    return Promise.resolve();
  }

  async disconnect() {
    return Promise.resolve();
  }
}

export const createTestDatabase = () => new MockDatabase();
