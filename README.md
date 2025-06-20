# Weather App 🌤️

A sophisticated, real-time weather application built with Next.js that delivers accurate weather forecasts and detailed meteorological data. This project showcases modern web development practices, responsive design, and seamless user experience.

![Weather App Screenshot](public/screenshot.png)

## 🌟 Key Features

### Real-time Weather Data
- Current weather conditions with detailed metrics
- 5-day weather forecast with daily predictions
- Hourly weather updates
- Temperature in both Celsius and Fahrenheit
- Wind speed and direction indicators
- Humidity and UV index monitoring
- Air quality measurements
- "Feels like" temperature calculations

### User Experience
- Intuitive and responsive design
- Smooth animations and transitions
- Real-time search functionality
- Dynamic weather icons
- Error handling and loading states
- Mobile-first approach
- Cross-browser compatibility

### Technical Features
- Server-side rendering with Next.js
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API requests
- Environment variable management
- ESLint for code quality
- Responsive grid layouts

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Animations**: Framer Motion
- **Icons**: React Icons
- **HTTP Client**: Axios

### API Integration
- WeatherAPI.com for weather data
- RESTful API architecture
- Error handling and retry mechanisms
- Data caching for performance

### Development Tools
- ESLint for code linting
- TypeScript for type checking
- Git for version control
- Vercel for deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager
- WeatherAPI.com API key
- Git for version control

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Steve-IX/weather_app.git
   cd weather_app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
weather_app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Main page component
│   ├── components/            # Reusable components
│   ├── types/                 # TypeScript type definitions
│   │   └── weather.ts        # Weather data types
│   └── utils/                # Utility functions
│       └── api.ts            # API integration
├── public/                   # Static assets
├── .env.local               # Environment variables
├── package.json             # Project dependencies
└── README.md               # Project documentation
```

## 🔧 API Integration

The application integrates with WeatherAPI.com to provide:
- Current weather conditions
- 5-day weather forecasts
- Air quality data
- Location search
- Hourly weather updates

### API Endpoints Used
- `/forecast.json` - Weather forecast data
- `/search.json` - Location search
- `/current.json` - Current weather conditions

## 🎨 UI/UX Features

### Design Elements
- Clean and modern interface
- Responsive grid layouts
- Dynamic weather icons
- Smooth animations
- Loading states
- Error messages
- Search functionality

### User Interactions
- Location search
- Temperature unit toggle
- Forecast navigation
- Responsive design adaptation
- Loading indicators
- Error handling

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain code style consistency
- Write meaningful commit messages
- Update documentation as needed
- Test thoroughly before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 👨‍💻 Author

**Steve Yeboah**
- Email: [a.stephenyeboah04@gmail.com](mailto:a.stephenyeboah04@gmail.com)
- GitHub: [@Steve-IX](https://github.com/Steve-IX)
- LinkedIn: [Steve Yeboah](https://www.linkedin.com/in/steve-yeboah)

## 🔗 Links

- [Live Demo](https://weather-app-steve-ix.vercel.app)
- [GitHub Repository](https://github.com/Steve-IX/weather_app)
- [Issue Tracker](https://github.com/Steve-IX/weather_app/issues)

---

⭐️ If you find this project helpful, please give it a star on GitHub!
