import { useTheme } from './hooks/useTheme';
import { useWeather } from './hooks/useWeather';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherStats } from './components/WeatherStats';
import { HourlyChart } from './components/HourlyChart';
import { DailyForecast } from './components/DailyForecast';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const { weather, loading, error, fetchWeather } = useWeather();

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`${latitude},${longitude}`);
      },
      () => {
        console.error('Unable to get location');
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header isDark={isDark} onToggleTheme={toggleTheme} />
        
        <SearchBar 
          onSearch={fetchWeather}
          onUseLocation={handleUseLocation}
        />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="bg-red-500/80 backdrop-blur-sm text-white p-6 rounded-2xl mb-6 shadow-xl">
            <p className="font-semibold"> {error}</p>
          </div>
        )}

        {!loading && weather && (
          <div className="space-y-6">
            <CurrentWeather weather={weather} />
            <WeatherStats weather={weather} />
            <HourlyChart weather={weather} />
            <DailyForecast weather={weather} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;