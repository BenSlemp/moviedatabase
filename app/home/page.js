'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase'; // Import auth from firebase
import MovieFinderLoggedIn from '../../components/MovieFinderLoggedIn'; // Import the logged-in component

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login'); // If not logged in, redirect to login page
      } else {
        setIsLoggedIn(true); // User is logged in
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, [router]);

  // Logout function
  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login'); // Redirect to login page after logging out
  };

  if (!isLoggedIn) {
    return <div>Loading...</div>; // Show loading until user login state is determined
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8">
      {/* Display the MovieFinderLoggedIn component */}
      <header className="flex justify-center items-center mb-10">
        <MovieFinderLoggedIn />
      </header>

      {/* Home Page content */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-black">Welcome to Movie Finder</h2>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => router.push('/saved-movies')}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Go to Saved Movies
          </button>
          <button
            onClick={() => router.push('/search')}
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700">
            Go to Movie Search
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 mt-6">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
