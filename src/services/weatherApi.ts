import axios from 'axios';
import type { WeatherData, Location } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

// Lấy thời tiết theo tên thành phố hoặc tọa độ
export const getWeather = async (query: string): Promise<WeatherData> => {
  try {
    console.log('Fetching weather for:', query);
    console.log('Using API key:', API_KEY);
    
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: query,
        days: 7,
        aqi: 'no',
        alerts: 'no',
      },
    });

    console.log('Weather data received');
    return response.data;
  } catch (error: any) {
    console.error('Error:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      throw new Error('City not found');
    }
    if (error.response?.status === 401) {
      throw new Error('Invalid API key');
    }
    throw new Error('Failed to fetch weather data');
  }
};

// Lấy thời tiết theo tên thành phố
export const getWeatherByCity = async (cityName: string): Promise<{
  weather: WeatherData;
  location: Location;
}> => {
  try {
    const weather = await getWeather(cityName);
    
    const location: Location = {
      name: weather.location.name,
      country: weather.location.country,
      lat: weather.location.lat,
      lon: weather.location.lon,
    };

    return { weather, location };
  } catch (error: any) {
    console.error('Error in getWeatherByCity:', error.message);
    throw error;
  }
};

// Lấy thời tiết theo tọa độ
export const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    return await getWeather(`${lat},${lon}`);
  } catch (error) {
    throw error;
  }
};

// Tìm kiếm thành phố
export const searchCity = async (query: string): Promise<Location[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    
    return response.data.map((city: any) => ({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
    }));
  } catch (error: any) {
    throw new Error('Failed to search city');
  }
};