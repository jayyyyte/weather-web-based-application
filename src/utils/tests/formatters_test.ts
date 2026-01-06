import { describe, it, expect } from 'vitest';

// Helper functions for testing
const formatTemp = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    hour12: true 
  });
};

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

describe('Formatter Utilities', () => {
  describe('formatTemp', () => {
    it('should format positive temperature', () => {
      expect(formatTemp(25.5)).toBe('26°C');
      expect(formatTemp(20.2)).toBe('20°C');
    });

    it('should format zero temperature', () => {
      expect(formatTemp(0)).toBe('0°C');
    });

    it('should format negative temperature', () => {
      expect(formatTemp(-5.8)).toBe('-6°C');
      expect(formatTemp(-10.3)).toBe('-10°C');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const result = formatDate('2025-12-07');
      expect(result).toContain('Dec');
      expect(result).toContain('7');
    });

    it('should handle ISO date format', () => {
      const result = formatDate('2025-12-07T00:00:00Z');
      expect(result).toContain('Dec');
    });
  });

  describe('formatTime', () => {
    it('should format time in 12-hour format', () => {
      const result = formatTime('2025-12-07 14:30');
      expect(result).toMatch(/\d{1,2}\s?(AM|PM)/i);
    });
  });

  describe('capitalizeFirst', () => {
    it('should capitalize first letter', () => {
      expect(capitalizeFirst('hello')).toBe('Hello');
      expect(capitalizeFirst('world')).toBe('World');
    });

    it('should not modify already capitalized strings', () => {
      expect(capitalizeFirst('WORLD')).toBe('WORLD');
      expect(capitalizeFirst('Hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalizeFirst('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalizeFirst('a')).toBe('A');
    });
  });
});