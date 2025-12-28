import { useState, useEffect } from 'react';
import { getWeather } from '../services/weatherApi';
import type { WeatherData } from '../types/weather';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity') || 'Hanoi';
    fetchWeather(lastCity);
  }, []);

  const fetchWeather = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeather(query);
      setWeather(data);
      localStorage.setItem('lastCity', data.location.name);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, fetchWeather };
}