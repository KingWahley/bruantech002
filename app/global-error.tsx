'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col items-center text-center gap-4 max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold font-mono text-rose-400">Something went wrong!</h2>
          <p className="text-xs text-zinc-400">
            {error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs rounded-xl transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
