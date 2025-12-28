import { format } from 'date-fns';

export const formatTemp = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const formatDate = (timestamp: number, formatStr: string = 'MMM dd'): string => {
  return format(new Date(timestamp * 1000), formatStr);
};

export const formatTime = (timestamp: number): string => {
  return format(new Date(timestamp * 1000), 'HH:mm');
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};