'use client';

import { useRouter } from 'next/navigation';

export default function MovieFinderLoggedOut() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/'); // Redirect to the landing page when clicked (app/page.js)
  };

  return (
    <h1
      className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-600 cursor-pointer"
      onClick={handleClick}
    >
      Book Finder
    </h1>
  );
}
