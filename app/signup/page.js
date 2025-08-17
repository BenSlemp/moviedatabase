'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase'; // your firebase.js

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('darkMode', newDark);
    document.documentElement.classList.toggle('dark', newDark);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Movie Finder Header */}
      <h1
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600 cursor-pointer mb-8"
        onClick={() => router.push('/')}
      >
        Movie Finder
      </h1>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="mb-8 px-4 py-2 border rounded bg-white dark:bg-gray-800 text-black dark:text-white"
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Signup Form */}
      <form onSubmit={handleSignup} className="flex flex-col items-start w-80">
        <label className="block mb-2 text-gray-900 dark:text-white">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full text-black dark:text-white dark:bg-gray-700"
        />

        <label className="block mb-2 text-gray-900 dark:text-white">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full text-black dark:text-white dark:bg-gray-700"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 w-full"
        >
          Sign Up
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Already have an account?{' '}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => router.push('/login')}
        >
          Login
        </span>
      </p>
    </div>
  );
}
