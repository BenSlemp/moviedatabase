'use client';

import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setMovies(data.results);
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

        <main>
          <h1 className="text-4xl font-semibold mb-6">Search Movies</h1>
          <form onSubmit={handleSearch} className="mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie"
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Search
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-white p-4 rounded-md shadow-lg">
                <h2 className="font-semibold">{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
