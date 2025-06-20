import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Forecast | Real-time Weather Updates",
  description: "Get accurate weather forecasts, real-time updates, and detailed weather information for any location worldwide.",
  keywords: "weather, forecast, temperature, humidity, wind, rain, snow, climate",
  authors: [{ name: "Steve Yeboah", url: "https://github.com/Steve-IX" }],
  creator: "Steve Yeboah",
  publisher: "Weather App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Weather Forecast",
  },
  openGraph: {
    title: "Weather Forecast | Real-time Weather Updates",
    description: "Get accurate weather forecasts, real-time updates, and detailed weather information for any location worldwide.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Forecast | Real-time Weather Updates",
    description: "Get accurate weather forecasts, real-time updates, and detailed weather information for any location worldwide.",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4facfe' },
    { media: '(prefers-color-scheme: dark)', color: '#667eea' },
  ],
  colorScheme: 'light dark',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Weather Forecast" />
        <meta name="application-name" content="Weather Forecast" />
        <meta name="msapplication-TileColor" content="#4facfe" />
        <meta name="theme-color" content="#4facfe" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} min-h-screen w-full overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
