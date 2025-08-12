'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-all duration-300`}>
      <div className="container mx-auto p-8">
        {/* Header */}
        <header className="flex justify-center items-center mb-10">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600">
            Movie Finder
          </h1>
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
