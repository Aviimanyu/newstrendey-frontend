"use client";
// app/news/error.js — catches runtime errors in the news route

import { useEffect } from "react";

export default function NewsError({ error, reset }) {
  useEffect(() => {
    console.error("[News Page Error]", error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <span className="material-symbols-outlined text-5xl text-red-400">cloud_off</span>
        <h2 className="text-2xl font-black">Something went wrong</h2>
        <p className="text-slate-500 text-sm max-w-md">
          {error?.message ?? "An unexpected error occurred while loading the news feed."}
        </p>
        <button
          onClick={reset}
          className="mt-2 inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          Try Again
        </button>
      </div>
    </div>
  );
}
