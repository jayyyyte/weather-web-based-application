import type { WeatherData } from '../types/weather';

interface CurrentWeatherProps {
  weather: WeatherData;
}

export function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {weather.location.name}
          </h2>
          <p className="text-white/80 text-lg">
            {weather.location.country}
          </p>
          <p className="text-white/60 text-sm mt-1">
            {new Date(weather.location.localtime).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <img
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div className="text-center">
            <div className="text-6xl md:text-7xl font-bold text-white">
              {Math.round(weather.current.temp_c)}°
            </div>
            <p className="text-white/80 text-lg mt-2">
              {weather.current.condition.text}
            </p>
            <p className="text-white/60 text-sm">
              Feels like {Math.round(weather.current.feelslike_c)}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}