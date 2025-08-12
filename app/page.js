'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSunsetMode, setIsSunsetMode] = useState(false);

  useEffect(() => {
    // Check if dark mode preference exists in localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);

    // Check if sunset mode preference exists in localStorage
    const savedSunsetMode = localStorage.getItem('sunsetMode') === 'true';
    setIsSunsetMode(savedSunsetMode);

    // Apply the dark mode class if needed
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply sunset mode class if needed
    if (savedSunsetMode) {
      document.documentElement.classList.add('sunset');
    } else {
      document.documentElement.classList.remove('sunset');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    // Apply the dark mode class to the <html> element
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Store dark mode preference in localStorage
    localStorage.setItem('darkMode', !isDarkMode);
  };

  const toggleSunsetMode = () => {
    setIsSunsetMode(!isSunsetMode);

    // Apply sunset mode class to the <html> element
    if (!isSunsetMode) {
      document.documentElement.classList.add('sunset');
    } else {
      document.documentElement.classList.remove('sunset');
    }

    // Store sunset mode preference in localStorage
    localStorage.setItem('sunsetMode', !isSunsetMode);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} ${isSunsetMode ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500' : ''} min-h-screen transition-all duration-300`}>
      <div className="container mx-auto p-8 flex flex-col justify-center items-center min-h-screen">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600">
            Movie Finder
          </h1>
          {/* Dark Mode Toggle and Sunset Mode Toggle */}
          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none"
            >
              {isDarkMode ? '🌙' : '🌞'} {/* Dark Mode Icon */}
            </button>
            <button
              onClick={toggleSunsetMode}
              className="p-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 focus:outline-none"
            >
              {isSunsetMode ? '🌅' : '☀️'} {/* Sunset Mode Icon */}
            </button>
          </div>
        </header>

        <main className="text-center mb-12">
          <h2 className="text-4xl font-semibold mb-6">
            Discover & Save Your Favorite Movies
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign in to search, save, and explore movies. Find detailed information and keep track of your favorites.
          </p>

          {/* Login / Signup Section */}
          <div className="flex justify-center gap-8 mb-8">
            <Link href="/login">
              <button className="px-8 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Link to Search Page */}
          <div>
            <Link href="/search">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
                Go to Movie Search
              </button>
            </Link>
          </div>
        </main>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>&copy; 2025 Movie Finder | All Rights Reserved</p>
        </footer>
      </div>
    </div>
  );
}
