'use client';

export default function SavedMovies() {
  const savedMovies = [
    { id: 1, title: 'Inception', overview: 'A mind-bending thriller.' },
    { id: 2, title: 'The Dark Knight', overview: 'A story about Batman.' },
  ];
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
          <h1 className="text-4xl font-semibold mb-6">Saved Movies</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedMovies.map((movie) => (
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
