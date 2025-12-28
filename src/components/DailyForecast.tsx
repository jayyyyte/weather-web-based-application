import type { WeatherData } from '../types/weather';

interface DailyForecastProps {
  weather: WeatherData;
}

export function DailyForecast({ weather }: DailyForecastProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-6">
        7-Day Forecast
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weather.forecast.forecastday.map((day) => (
          <div
            key={day.date}
            className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-all"
          >
            <p className="text-white/80 text-sm mb-2">
              {new Date(day.date).toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </p>
            <img
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="w-12 h-12 mx-auto mb-2"
            />
            <div className="flex justify-center gap-2 text-white font-semibold">
              <span>{Math.round(day.day.maxtemp_c)}°</span>
              <span className="text-white/50">{Math.round(day.day.mintemp_c)}°</span>
            </div>
            <p className="text-white/60 text-xs mt-2">
              {day.day.condition.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}