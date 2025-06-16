'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchWeatherData, searchLocations } from '@/utils/api';
import { WeatherData } from '@/types/weather';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const data = await fetchWeatherData(searchQuery);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return <WiDaySunny className="text-6xl" />;
    if (conditionLower.includes('rain')) return <WiRain className="text-6xl" />;
    if (conditionLower.includes('snow')) return <WiSnow className="text-6xl" />;
    if (conditionLower.includes('thunder')) return <WiThunderstorm className="text-6xl" />;
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return <WiFog className="text-6xl" />;
    return <WiDaySunny className="text-6xl" />;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Weather Forecast</h1>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {weatherData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {weatherData.location.name}, {weatherData.location.country}
                </h2>
                <p className="text-gray-600">{weatherData.location.localtime}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-gray-800">
                  {weatherData.current.temp_c}°C
                </div>
                <div className="text-gray-600">{weatherData.current.condition.text}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Wind</div>
                <div className="text-lg font-semibold">{weatherData.current.wind_kph} km/h</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="text-lg font-semibold">{weatherData.current.humidity}%</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Feels Like</div>
                <div className="text-lg font-semibold">{weatherData.current.feelslike_c}°C</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">UV Index</div>
                <div className="text-lg font-semibold">{weatherData.current.uv}</div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {weatherData.forecast.forecastday.map((day) => (
                  <div key={day.date} className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className="my-2">{getWeatherIcon(day.day.condition.text)}</div>
                    <div className="text-lg font-semibold">{day.day.maxtemp_c}°C</div>
                    <div className="text-sm text-gray-600">{day.day.mintemp_c}°C</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
