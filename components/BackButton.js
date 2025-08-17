'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // Go to the previous page
      className="absolute top-4 left-4 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none"
    >
      &#8592; {/* Left arrow symbol for "Back" */}
    </button>
  );
}
