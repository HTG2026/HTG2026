"use client";

import { Component, type ReactNode } from "react";

const RETRY_KEY = "chunk-load-retry";

export default class ChunkLoadErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    const isChunkError =
      error instanceof Error &&
      (error.name === "ChunkLoadError" ||
        error.message?.includes("Loading chunk") ||
        error.message?.includes("Loading CSS chunk"));
    return isChunkError ? { hasError: true } : null;
  }

  componentDidCatch(error: unknown) {
    const isChunkError =
      error instanceof Error &&
      (error.name === "ChunkLoadError" ||
        error.message?.includes("Loading chunk") ||
        error.message?.includes("Loading CSS chunk"));

    if (isChunkError) {
      const retried = sessionStorage.getItem(RETRY_KEY) === "1";
      if (!retried) {
        sessionStorage.setItem(RETRY_KEY, "1");
        window.location.reload();
        return;
      }
      sessionStorage.removeItem(RETRY_KEY);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
          <p className="text-slate-600 text-center max-w-md">
            A cached version of the site may be outdated. Please refresh to load the latest version.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-teal text-white font-semibold hover:bg-teal/90 transition-colors"
          >
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
