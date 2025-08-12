'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import MovieFinderLoggedIn from '../../components/MovieFinderLoggedIn'; // For logged-in users
import MovieFinderLoggedOut from '../../components/MovieFinderLoggedOut'; // For logged-out users

export default function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false); // If not logged in, show MovieFinderLoggedOut
      } else {
        setIsLoggedIn(true); // If logged in, show MovieFinderLoggedIn
        // Fetch saved movies from localStorage
        const movies = JSON.parse(localStorage.getItem('savedMovies')) || [];
        setSavedMovies(movies);
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, [router]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8">
        {/* Display the MovieFinderLoggedOut component */}
        <header className="flex justify-center items-center mb-10">
          <MovieFinderLoggedOut />
        </header>

        {/* Saved Movies content for logged-out users */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center text-black">Saved Movies</h2>
          {/* Add content for logged-out users */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8">
      {/* Display the MovieFinderLoggedIn component */}
      <header className="flex justify-center items-center mb-10">
        <MovieFinderLoggedIn />
      </header>

      {/* Saved Movies content for logged-in users */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-black">Saved Movies</h2>
        {savedMovies.length > 0 ? (
          <div className="space-y-4">
            {savedMovies.map((movie, index) => (
              <div key={index} className="flex justify-between items-center p-4 border-b">
                <p className="text-lg font-medium">{movie.title}</p>
                <button
                  onClick={() => {
                    const updatedMovies = savedMovies.filter((_, i) => i !== index);
                    localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
                    setSavedMovies(updatedMovies); // Update local state
                  }}
                  className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No saved movies yet. Start searching!</p>
        )}
      </div>
    </div>
  );
}
