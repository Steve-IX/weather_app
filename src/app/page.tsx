'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { fetchWeatherData } from '@/utils/api';
import { WeatherData } from '@/types/weather';
import { FiSearch, FiMapPin, FiThermometer, FiDroplet, FiSun, FiEye, FiClock, FiCompass } from 'react-icons/fi';
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiFog, WiCloudy, WiHumidity, WiStrongWind } from 'react-icons/wi';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    
    updateTime(); // Set initial time
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const data = await fetchWeatherData(searchQuery);
      setWeatherData(data);
    } catch {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) return <WiDaySunny className="text-4xl sm:text-5xl md:text-6xl text-yellow-500 drop-shadow-lg filter brightness-110" />;
    if (conditionLower.includes('rain')) return <WiRain className="text-4xl sm:text-5xl md:text-6xl text-blue-500 drop-shadow-lg filter brightness-110" />;
    if (conditionLower.includes('snow')) return <WiSnow className="text-4xl sm:text-5xl md:text-6xl text-blue-300 drop-shadow-lg filter brightness-110" />;
    if (conditionLower.includes('thunder')) return <WiThunderstorm className="text-4xl sm:text-5xl md:text-6xl text-purple-500 drop-shadow-lg filter brightness-110" />;
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return <WiFog className="text-4xl sm:text-5xl md:text-6xl text-gray-400 drop-shadow-lg filter brightness-110" />;
    if (conditionLower.includes('cloud')) return <WiCloudy className="text-4xl sm:text-5xl md:text-6xl text-gray-500 drop-shadow-lg filter brightness-110" />;
    return <WiDaySunny className="text-4xl sm:text-5xl md:text-6xl text-yellow-500 drop-shadow-lg filter brightness-110" />;
  };

  const getBackgroundGradient = () => {
    if (!weatherData) return 'from-blue-400 via-blue-500 to-blue-600';
    
    const condition = weatherData.current.condition.text.toLowerCase();
    if (condition.includes('sunny') || condition.includes('clear')) return 'from-yellow-400 via-orange-500 to-red-500';
    if (condition.includes('rain')) return 'from-blue-500 via-blue-600 to-blue-700';
    if (condition.includes('snow')) return 'from-blue-300 via-blue-400 to-blue-500';
    if (condition.includes('thunder')) return 'from-purple-500 via-purple-600 to-purple-700';
    if (condition.includes('cloud')) return 'from-gray-400 via-gray-500 to-gray-600';
    return 'from-blue-400 via-blue-500 to-blue-600';
  };

  const getWeatherParticles = () => {
    if (!weatherData) return null;
    
    const condition = weatherData.current.condition.text.toLowerCase();
    if (condition.includes('rain')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-4 sm:w-1 sm:h-8 bg-gradient-to-b from-blue-400/80 to-blue-600/60 rounded-full"
              initial={{ y: -100, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) }}
              animate={{ y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100 }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      );
    }
    if (condition.includes('snow')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/90 rounded-full"
              initial={{ y: -50, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) }}
              animate={{ 
                y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50, 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                rotate: 360
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      );
    }
    if (condition.includes('thunder')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: (typeof window !== 'undefined' ? window.innerHeight : 1000) }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  const getAirQualityColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-400';
    if (aqi <= 100) return 'text-yellow-400';
    if (aqi <= 150) return 'text-orange-400';
    if (aqi <= 200) return 'text-red-400';
    return 'text-purple-400';
  };

  const getAirQualityText = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    return 'Very Unhealthy';
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 relative overflow-hidden`}>
      {/* Weather-specific particles */}
      {getWeatherParticles()}
      
      {/* Enhanced background elements with parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y }}
      >
        <motion.div 
          className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-white/10 rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-2xl sm:blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.1, 0.05],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        />
        {/* Additional floating elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-16 h-16 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-xl sm:blur-2xl"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 3 }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-12 h-12 sm:w-24 sm:h-24 bg-white/5 rounded-full blur-xl sm:blur-2xl"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 4 }}
        />
      </motion.div>

      {/* Interactive cursor effect - hidden on mobile */}
      <motion.div
        className="fixed w-4 h-4 bg-white/30 rounded-full pointer-events-none z-50 mix-blend-difference hidden sm:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <div className="relative z-10 w-full min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Header with current time */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div 
            className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FiClock className="text-white/80 text-lg sm:text-xl" />
            <span className="text-white/80 text-base sm:text-lg font-mono">
              {isClient ? currentTime : '--:--:--'}
            </span>
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 drop-shadow-lg px-2"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 40px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Weather Forecast
          </motion.h1>
          <p className="text-white/80 text-base sm:text-lg md:text-xl px-4">Get real-time weather updates for any location</p>
        </motion.div>
        
        {/* Enhanced search section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-white/20 hover:bg-white/15 transition-all duration-500 mx-auto max-w-4xl"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg sm:text-xl" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter city name..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white/20 border border-white/30 rounded-xl sm:rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm text-base sm:text-lg hover:bg-white/25 transition-all duration-300"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 text-white rounded-xl sm:rounded-2xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/30 font-semibold text-base sm:text-lg min-w-[120px]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div 
                    className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="hidden sm:inline">Loading...</span>
                </div>
              ) : (
                'Search'
              )}
            </motion.button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                className="bg-red-500/20 border border-red-400/30 text-red-100 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl backdrop-blur-sm text-sm sm:text-base"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {weatherData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6 sm:space-y-8 max-w-7xl mx-auto"
            >
              {/* Enhanced Current Weather Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-500"
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="hidden sm:block"
                    >
                      <FiMapPin className="text-white/80 text-2xl sm:text-3xl" />
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 truncate">
                        {weatherData.location.name}, {weatherData.location.country}
                      </h2>
                      <p className="text-white/70 text-sm sm:text-base lg:text-lg">{weatherData.location.localtime}</p>
                    </div>
                  </div>
                  <div className="text-center sm:text-right flex-shrink-0">
                    <motion.div 
                      className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-1 sm:mb-2"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {weatherData.current.temp_c}°C
                    </motion.div>
                    <div className="text-white/80 text-base sm:text-lg lg:text-xl">{weatherData.current.condition.text}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 weather-card"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <WiStrongWind className="text-white/80 text-xl sm:text-2xl flex-shrink-0" />
                      <div className="text-white/60 text-xs sm:text-sm font-medium truncate">Wind Speed</div>
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{weatherData.current.wind_kph} km/h</div>
                    <div className="text-white/60 text-xs sm:text-sm mt-1 flex items-center gap-1">
                      <FiCompass className="text-xs flex-shrink-0" />
                      <span className="truncate">{weatherData.current.wind_dir}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 weather-card"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <WiHumidity className="text-white/80 text-xl sm:text-2xl flex-shrink-0" />
                      <div className="text-white/60 text-xs sm:text-sm font-medium truncate">Humidity</div>
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{weatherData.current.humidity}%</div>
                    <div className="text-white/60 text-xs sm:text-sm mt-1 flex items-center gap-1">
                      <FiDroplet className="text-xs flex-shrink-0" />
                      <span className="truncate">Relative humidity</span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 weather-card"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <FiThermometer className="text-white/80 text-xl sm:text-2xl flex-shrink-0" />
                      <div className="text-white/60 text-xs sm:text-sm font-medium truncate">Feels Like</div>
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{weatherData.current.feelslike_c}°C</div>
                    <div className="text-white/60 text-xs sm:text-sm mt-1 truncate">Apparent temperature</div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white/10 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 weather-card"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <FiSun className="text-white/80 text-xl sm:text-2xl flex-shrink-0" />
                      <div className="text-white/60 text-xs sm:text-sm font-medium truncate">UV Index</div>
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{weatherData.current.uv}</div>
                    <div className="text-white/60 text-xs sm:text-sm mt-1 truncate">Sun protection</div>
                  </motion.div>
                </div>

                {/* Air Quality Section */}
                {weatherData.current.air_quality && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 sm:mt-6 p-4 sm:p-6 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <FiEye className="text-white/80 text-lg sm:text-xl flex-shrink-0" />
                      <div className="text-white/80 text-base sm:text-lg font-medium">Air Quality</div>
                    </div>
                    <div className={`text-xl sm:text-2xl font-bold ${getAirQualityColor(weatherData.current.air_quality['us-epa-index'])}`}>
                      {getAirQualityText(weatherData.current.air_quality['us-epa-index'])}
                    </div>
                    <div className="text-white/60 text-xs sm:text-sm mt-1">EPA Index: {weatherData.current.air_quality['us-epa-index']}</div>
                  </motion.div>
                )}
              </motion.div>

              {/* Enhanced 5-Day Forecast */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-500"
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="flex-shrink-0"
                  >
                    <FiSun className="text-yellow-400 text-2xl sm:text-3xl" />
                  </motion.div>
                  <span className="truncate">5-Day Forecast</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                  {weatherData.forecast.forecastday.map((day, index) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="bg-white/10 p-4 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/20 text-center hover:bg-white/20 transition-all duration-300 weather-card"
                    >
                      <div className="text-white/80 text-sm mb-3 font-medium">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <motion.div 
                        className="my-3 sm:my-4 flex justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {getWeatherIcon(day.day.condition.text)}
                      </motion.div>
                      <div className="text-xl sm:text-2xl font-bold text-white mb-1">{day.day.maxtemp_c}°C</div>
                      <div className="text-white/60 text-sm">{day.day.mintemp_c}°C</div>
                      <div className="text-white/50 text-xs mt-2 truncate">{day.day.condition.text}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
