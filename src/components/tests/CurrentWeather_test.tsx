import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {CurrentWeather} from '../CurrentWeather';

describe('CurrentWeather Component', () => {
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
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
        code: 1003
      },
      last_updated_epoch: 1702000000,
      last_updated: '2025-12-07 15:00'
    },
    forecast: { forecastday: [] }
  };

  it('should display location name and country', () => {
    render(<CurrentWeather weather={mockWeather} />);

    expect(screen.getByText('Hanoi')).toBeDefined();
    expect(screen.getByText(/Vietnam/i)).toBeDefined();
  });

  it('should display temperature correctly', () => {
    render(<CurrentWeather weather={mockWeather} />);

    expect(screen.getByText(/25/)).toBeDefined();
    expect(screen.getByText(/feels like.*27/i)).toBeDefined();
  });

  it('should display weather condition', () => {
    render(<CurrentWeather weather={mockWeather} />);

    expect(screen.getByText('Partly cloudy')).toBeDefined();
  });

  it('should render weather icon', () => {
    render(<CurrentWeather weather={mockWeather} />);

    const icon = screen.getByAltText('Partly cloudy') as HTMLImageElement;
    expect(icon).toBeDefined();
    expect(icon.src).toContain('116.png');
  });
});