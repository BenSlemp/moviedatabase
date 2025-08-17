'use client';

import { useState, useEffect } from 'react';
import MovieFinderLoggedIn from '../../components/MovieFinderLoggedIn'; // make sure the path is correct

export default function SavedBooksPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') setIsDarkMode(true);

    const saved = JSON.parse(localStorage.getItem('savedBooks') || '[]');
    setSavedBooks(saved);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', !isDarkMode);
  };

  const removeBook = (bookId) => {
    const newSaved = savedBooks.filter((b) => b.id !== bookId);
    setSavedBooks(newSaved);
    localStorage.setItem('savedBooks', JSON.stringify(newSaved));
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-all duration-300 p-8`}>
      <header className="flex flex-col items-center mb-8">
        {/* Replace h1 with clickable component */}
        <MovieFinderLoggedIn />

        <button
          onClick={toggleTheme}
          className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow-md hover:scale-105 transition-transform duration-300 mt-4"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      {savedBooks.length === 0 ? (
        <p className="text-center text-xl mt-8">You have not saved any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedBooks.map((book) => (
            <div key={book.id} className="border rounded-lg p-4 shadow-md flex flex-col">
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="mb-4 mx-auto" />
              )}
              <h2 className="font-bold text-lg mb-2">{book.volumeInfo.title}</h2>
              <p className="italic mb-2">{book.volumeInfo.authors?.join(', ')}</p>
              <p className="text-sm mb-2">{book.volumeInfo.description?.slice(0, 100)}...</p>
              <button
                onClick={() => removeBook(book.id)}
                className="mt-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
