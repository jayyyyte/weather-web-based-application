import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('should save value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', ''));

    act(() => {
      result.current[1]('new-value');
    });

    expect(localStorage.getItem('test-key')).toBe('"new-value"');
    expect(result.current[0]).toBe('new-value');
  });

  it('should load existing value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('existing-value'));

    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));

    expect(result.current[0]).toBe('existing-value');
  });

  it('should handle complex objects', () => {
    const { result } = renderHook(() => 
      useLocalStorage('user', { name: 'John', age: 30 })
    );

    act(() => {
      result.current[1]({ name: 'Jane', age: 25 });
    });

    const stored = JSON.parse(localStorage.getItem('user') || '{}');
    expect(stored).toEqual({ name: 'Jane', age: 25 });
    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 });
  });
});

