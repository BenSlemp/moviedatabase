'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import MovieFinderLoggedIn from '../../components/MovieFinderLoggedIn'; // For logged-in users
import MovieFinderLoggedOut from '../../components/MovieFinderLoggedOut'; // For logged-out users

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false); // If not logged in, show MovieFinderLoggedOut
      } else {
        setIsLoggedIn(true); // If logged in, show MovieFinderLoggedIn
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, [router]);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!query.trim()) return; // If query is empty, don't search

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&language=en-US&page=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results); // Set the fetched movies
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      setErrorMessage('Error fetching movie data. Please try again.');
    }
  };

  const saveMovie = (movie) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    savedMovies.push(movie);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    alert(`${movie.title} saved to your list!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8">
      {/* Display the correct MovieFinder component based on login state */}
      <header className="flex justify-center items-center mb-10">
        {isLoggedIn ? <MovieFinderLoggedIn /> : <MovieFinderLoggedOut />}
      </header>

      {/* Search content */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-black">Search Movies</h2>

        {/* Search form */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md text-black" // Ensure text is black
            placeholder="Search for a movie..."
          />
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Search
          </button>
        </form>

        {/* Display search results */}
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        {movies.length > 0 ? (
          <div className="space-y-4">
            {movies.map((movie) => (
              <div key={movie.id} className="flex justify-between items-center p-4 border-b">
                <p className="text-lg font-medium">{movie.title}</p>
                <button
                  onClick={() => saveMovie(movie)}
                  className="text-green-600 hover:text-green-800">
                  Save
                </button>
              </div>
            ))}
          </div>
        ) : (
          query && <p className="text-center text-gray-500">No results found for "{query}"</p>
        )}
      </div>
    </div>
  );
}
