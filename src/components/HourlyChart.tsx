import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { WeatherData } from '../types/weather';

interface HourlyChartProps {
  weather: WeatherData;
}

export function HourlyChart({ weather }: HourlyChartProps) {
  const hourlyData = weather.forecast.forecastday[0]?.hour.map((h) => ({
    time: new Date(h.time).getHours() + ':00',
    temp: Math.round(h.temp_c),
  })) || [];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-6">
        24-Hour Temperature
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={hourlyData}>
          <XAxis 
            dataKey="time" 
            stroke="#fff" 
            strokeOpacity={0.5}
            tick={{ fill: '#fff' }}
          />
          <YAxis 
            stroke="#fff" 
            strokeOpacity={0.5}
            tick={{ fill: '#fff' }}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="temp" 
            stroke="#fbbf24" 
            strokeWidth={3}
            dot={{ fill: '#fbbf24', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}