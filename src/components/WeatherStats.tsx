import { Droplets, Wind, Gauge, Cloud } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherStatsProps {
  weather: WeatherData;
}

export function WeatherStats({ weather }: WeatherStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-white/70 mb-2">
          <Droplets className="w-5 h-5" />
          <span className="text-sm">Humidity</span>
        </div>
        <p className="text-2xl font-bold text-white">
          {weather.current.humidity}%
        </p>
      </div>

      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-white/70 mb-2">
          <Wind className="w-5 h-5" />
          <span className="text-sm">Wind Speed</span>
        </div>
        <p className="text-2xl font-bold text-white">
          {weather.current.wind_kph} km/h
        </p>
      </div>

      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-white/70 mb-2">
          <Gauge className="w-5 h-5" />
          <span className="text-sm">Pressure</span>
        </div>
        <p className="text-2xl font-bold text-white">
          {weather.current.pressure_mb} mb
        </p>
      </div>

      <div className="bg-white/10 rounded-xl p-4">
        <div className="flex items-center gap-2 text-white/70 mb-2">
          <Cloud className="w-5 h-5" />
          <span className="text-sm">Condition</span>
        </div>
        <p className="text-lg font-bold text-white">
          {weather.current.condition.text}
        </p>
      </div>
    </div>
  );
}