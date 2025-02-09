import React from "react";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function Error({ message, onRetry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-md w-80">
        <p className="text-lg font-semibold">Error</p>
        <p className="text-sm mt-2">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
