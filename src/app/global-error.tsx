"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col items-center justify-center bg-[#07090B] text-white font-sans p-6">
        <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
        <p className="text-white/60 mb-6 text-center max-w-md">{error.message}</p>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg bg-[#00B5B2] text-white font-semibold hover:bg-[#009a97] transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
