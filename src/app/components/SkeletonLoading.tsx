import React from "react";

export default function SkeletonLoading() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen animate-pulse">
      {/* Navbar Skeleton */}
      <div className="h-[80px] bg-gray-300 w-full"></div>

      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* Today's Weather Skeleton */}
        <div className="h-40 bg-gray-300 rounded-lg"></div>

        {/* 7-Day Forecast Skeleton */}
        <p className="text-2xl bg-gray-300 w-32 h-6 rounded"></p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
            ))}
        </div>
      </main>
    </div>
  );
}
