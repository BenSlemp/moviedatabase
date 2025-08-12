'use client';

import { useRouter } from 'next/navigation';

export default function MovieFinderLoggedIn() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/home'); // Redirect to the home page when clicked
  };

  return (
    <h1
      className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600 cursor-pointer"
      onClick={handleClick}
    >
      Movie Finder
    </h1>
  );
}
