'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function Home() {
  const router = useRouter();

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setIsDarkMode(true);
  }, []);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // redirect to landing page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen flex flex-col justify-between transition-all duration-300`}>
      
      <div className="container mx-auto p-8 flex flex-col items-center">
        {/* Header */}
        <header className="flex flex-col items-center mb-6">
          <h1 className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600 mb-4">
            Book Finder
          </h1>
          <p className="text-center text-lg max-w-xl">
            Search, save, and explore books. Find detailed information and keep track of your favorites!
          </p>
        </header>

        {/* Dark mode toggle below header */}
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition mb-8"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Navigation buttons side by side */}
        <main className="flex gap-4 mt-4">
          <button
            onClick={() => router.push('/search')}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500 transition w-48 text-center"
          >
            Search Books
          </button>
          <button
            onClick={() => router.push('/saved')}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500 transition w-48 text-center"
          >
            Saved Books
          </button>
        </main>
      </div>

      {/* Logout button at the bottom */}
      <div className="container mx-auto p-8 flex justify-center">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
