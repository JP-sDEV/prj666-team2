import { describe, it, expect } from '@jest/globals';

// Simple utility function to format dates
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

describe('formatDate utility', () => {
  it('formats a date correctly', () => {
    const testDate = new Date(2023, 0, 15); // January 15, 2023
    const formattedDate = formatDate(testDate);
    expect(formattedDate).toBe('January 15, 2023');
  });

  it('handles different dates', () => {
    const testDate = new Date(2024, 5, 30); // June 30, 2024
    const formattedDate = formatDate(testDate);
    expect(formattedDate).toBe('June 30, 2024');
  });
});
