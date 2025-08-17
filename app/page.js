'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setIsDarkMode(true);
  }, []);

  // Apply dark mode class to <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-all duration-300`}>
      <div className="container mx-auto p-8 flex flex-col items-center">
        {/* Header */}
        <header className="flex flex-col items-center mb-10">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600 mb-4">
            Book Finder
          </h1>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition mb-6"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        <main className="text-center mb-8">
          {/* Intro text */}
          <div className="mb-8 space-y-2">
            <h2 className="text-3xl font-semibold">Discover & Save Your Favorite Books</h2>
            <p className="text-lg">
              Sign in to search, save, and explore books. Find detailed information and keep track of your favorites.
            </p>
          </div>

          {/* Login & Sign Up buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500 transition"
            >
              Sign Up
            </button>
          </div>

          {/* Removed the "Go to Search" button */}
        </main>
      </div>
    </div>
  );
}
