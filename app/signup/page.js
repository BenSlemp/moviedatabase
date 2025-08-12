'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signing up with:', email, password);
    router.push('/search'); // Redirect to the search page after successful signup
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <div className="container mx-auto p-8">
        {/* Header */}
        <header className="flex justify-center items-center mb-10">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600">
            Movie Finder
          </h1>
        </header>

        <main className="flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
                Sign Up
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
