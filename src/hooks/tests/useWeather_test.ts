import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useWeather } from '../useWeather';
import * as weatherApi from '../../services/weatherApi';

vi.mock('../../services/weatherApi');

describe('useWeather Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should initialize with null weather data', () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.weather).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch weather on mount with default city', async () => {
    const mockWeather = {
      location: { 
        name: 'Hanoi', 
        country: 'Vietnam', 
        lat: 21.03, 
        lon: 105.85, 
        tz_id: 'Asia/Bangkok', 
        localtime_epoch: 1702000000, 
        localtime: '2025-12-07 15:30' 
      },
      current: { 
        temp_c: 25, 
        feelslike_c: 27,
        humidity: 70,
        pressure_mb: 1013,
        wind_kph: 15,
        condition: { text: 'Clear', icon: '', code: 1000 },
        last_updated_epoch: 1702000000,
        last_updated: '2025-12-07 15:00'
      },
      forecast: { forecastday: [] }
    };

    vi.spyOn(weatherApi, 'getWeather').mockResolvedValue(mockWeather as any);

    const { result } = renderHook(() => useWeather());

    await waitFor(() => {
      expect(result.current.weather).toEqual(mockWeather);
      expect(result.current.loading).toBe(false);
    });
  });

  it('should handle fetch weather error', async () => {
    vi.spyOn(weatherApi, 'getWeather').mockRejectedValue(new Error('City not found'));

    const { result } = renderHook(() => useWeather());

    await waitFor(() => {
      expect(result.current.error).toBe('City not found');
      expect(result.current.weather).toBeNull();
      expect(result.current.loading).toBe(false);
    });
  });

  it('should save last searched city to localStorage', async () => {
    const mockWeather = {
      location: { 
        name: 'Tokyo', 
        country: 'Japan', 
        lat: 35.68, 
        lon: 139.65, 
        tz_id: 'Asia/Tokyo', 
        localtime_epoch: 1702000000, 
        localtime: '2025-12-07 16:00' 
      },
      current: { 
        temp_c: 20,
        feelslike_c: 22,
        humidity: 60,
        pressure_mb: 1015,
        wind_kph: 10,
        condition: { text: 'Clear', icon: '', code: 1000 },
        last_updated_epoch: 0,
        last_updated: ''
      },
      forecast: { forecastday: [] }
    };

    vi.spyOn(weatherApi, 'getWeather').mockResolvedValue(mockWeather as any);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchWeather('Tokyo');
    });

    await waitFor(() => {
      expect(localStorage.getItem('lastCity')).toBe('Tokyo');
    });
  });

  it('should set loading state during fetch', async () => {
    const mockWeather = {
      location: { 
        name: 'Paris', 
        country: 'France', 
        lat: 48.85, 
        lon: 2.35, 
        tz_id: 'Europe/Paris', 
        localtime_epoch: 0, 
        localtime: '' 
      },
      current: { 
        temp_c: 15,
        feelslike_c: 17,
        humidity: 75,
        pressure_mb: 1012,
        wind_kph: 12,
        condition: { text: 'Cloudy', icon: '', code: 1006 },
        last_updated_epoch: 0,
        last_updated: ''
      },
      forecast: { forecastday: [] }
    };

    vi.spyOn(weatherApi, 'getWeather').mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockWeather as any), 100))
    );

    const { result } = renderHook(() => useWeather());

    act(() => {
      result.current.fetchWeather('Paris');
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
