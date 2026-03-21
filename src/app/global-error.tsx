"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isChunkError =
    error.name === "ChunkLoadError" ||
    error.message?.includes("Loading chunk") ||
    error.message?.includes("Loading CSS chunk");

  useEffect(() => {
    if (isChunkError && typeof window !== "undefined") {
      const retried = sessionStorage.getItem("chunk-load-retry") === "1";
      if (!retried) {
        sessionStorage.setItem("chunk-load-retry", "1");
        window.location.reload();
        return;
      }
      sessionStorage.removeItem("chunk-load-retry");
    }
  }, [isChunkError]);

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col items-center justify-center bg-htbg text-htdark font-sans p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-xl font-bold">Something went wrong</h1>
          <p className="text-slate-600 text-sm">
            {isChunkError
              ? "A cached version may be outdated. Try refreshing."
              : "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={() => (isChunkError ? window.location.reload() : reset())}
            className="px-6 py-3 rounded-full bg-[#00B5B2] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {isChunkError ? "Refresh page" : "Try again"}
          </button>
        </div>
      </body>
    </html>
  );
}
