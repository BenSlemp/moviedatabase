'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, createUserWithEmailAndPassword } from '../../lib/firebase';
import MovieFinderLoggedOut from '../../components/MovieFinderLoggedOut'; // Import the logged-out component

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create a new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login'); // Redirect to login page after successful sign-up
    } catch (error) {
      setErrorMessage(error.message); // Show error message if signup fails
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8">
      {/* Display the MovieFinderLoggedOut component */}
      <header className="flex justify-center items-center mb-10">
        <MovieFinderLoggedOut />
      </header>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-black">Sign Up</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        {/* Form */}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-black">Email</label>
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
            <label htmlFor="password" className="block text-sm font-semibold text-black">Password</label>
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
    </div>
  );
}
