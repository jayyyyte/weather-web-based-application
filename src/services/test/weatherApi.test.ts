// src/services/__tests__/weatherApi.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import type { Mocked } from 'vitest';
import { getWeather, searchCity } from '../weatherApi';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('Weather API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getWeather', () => {
    it('should fetch weather data successfully', async () => {
      const mockData = {
        location: {
          name: 'Hanoi',
          country: 'Vietnam',
          lat: 21.03,
          lon: 105.85,
          localtime: '2025-12-07 15:30'
        },
        current: {
          temp_c: 25,
          feelslike_c: 27,
          humidity: 70,
          condition: { text: 'Partly cloudy', icon: '//cdn.icon.png' }
        },
        forecast: {
          forecastday: []
        }
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getWeather('Hanoi');
      
      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/forecast.json'),
        expect.objectContaining({
          params: expect.objectContaining({
            q: 'Hanoi',
            days: 7
          })
        })
      );
    });

    it('should throw error for invalid city', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: { status: 400, data: { error: { message: 'No matching location' } } }
      });

      await expect(getWeather('InvalidCity123')).rejects.toThrow('City not found');
    });

    it('should throw error for invalid API key', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: { status: 401, data: { error: { message: 'Invalid API key' } } }
      });

      await expect(getWeather('London')).rejects.toThrow('Invalid API key');
    });

    it('should handle network errors', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

      await expect(getWeather('Paris')).rejects.toThrow('Failed to fetch weather data');
    });

    it('should fetch weather by coordinates', async () => {
      const mockData = {
        location: { name: 'Tokyo', country: 'Japan' },
        current: { temp_c: 20 },
        forecast: { forecastday: [] }
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getWeather('35.6762,139.6503');
      
      expect(result.location.name).toBe('Tokyo');
    });
  });

  describe('searchCity', () => {
    it('should return list of matching cities', async () => {
      const mockCities = [
        { name: 'London', country: 'United Kingdom', lat: 51.52, lon: -0.11 },
        { name: 'London', country: 'Canada', lat: 42.98, lon: -81.23 }
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: mockCities });

      const result = await searchCity('London');
      
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('London');
      expect(result[1].country).toBe('Canada');
    });

    it('should handle empty search results', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });

      const result = await searchCity('XYZ123NotACity');
      
      expect(result).toEqual([]);
    });
  });
});
