import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {WeatherStats} from '../WeatherStats';

describe('WeatherStats Component', () => {
  const mockWeather = {
    location: { 
      name: 'Test', 
      country: 'Test', 
      lat: 0, 
      lon: 0, 
      tz_id: '', 
      localtime_epoch: 0, 
      localtime: '' 
    },
    current: {
      temp_c: 20,
      feelslike_c: 22,
      humidity: 65,
      pressure_mb: 1015,
      wind_kph: 20,
      condition: { text: 'Clear', icon: '', code: 1000 },
      last_updated_epoch: 0,
      last_updated: ''
    },
    forecast: { forecastday: [] }
  };

  it('should display humidity stat', () => {
    render(<WeatherStats weather={mockWeather} />);

    expect(screen.getByText('Humidity')).toBeDefined();
    expect(screen.getByText(/65%/)).toBeDefined();
  });

  it('should display wind speed stat', () => {
    render(<WeatherStats weather={mockWeather} />);

    expect(screen.getByText(/Wind Speed/i)).toBeDefined();
    expect(screen.getByText(/20.*km\/h/i)).toBeDefined();
  });

  it('should display pressure stat', () => {
    render(<WeatherStats weather={mockWeather} />);

    expect(screen.getByText('Pressure')).toBeDefined();
    expect(screen.getByText(/1015/)).toBeDefined();
  });

  it('should display condition stat', () => {
    render(<WeatherStats weather={mockWeather} />);

    expect(screen.getByText(/Condition/i)).toBeDefined();
    expect(screen.getByText('Clear')).toBeDefined();
  });
});