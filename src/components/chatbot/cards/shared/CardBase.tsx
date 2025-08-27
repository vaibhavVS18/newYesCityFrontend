'use client';

import React from 'react';

export interface BaseCardProps {
  data: any;
  imageSrc: string;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  category: string;
}

export const CardBase: React.FC<{
  children: React.ReactNode;
  imageSrc: string;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  category: string;
  premium?: string;
}> = ({ children, imageSrc, onImageError, category, premium }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
    {/* Image Section */}
    <div className="relative overflow-hidden">
      <img
        src={imageSrc}
        alt={`${category} image`}
        className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        onError={onImageError}
      />

      {/* Category Tag */}
      <div className="absolute top-3 left-3">
        <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          {category === "City" && "🏙️"}
          {category === "Hotel" && "🏨"}
          {category === "Attraction" && "🎡"}
          {category}
        </span>
      </div>

      {/* Premium Badge */}
      {premium && (
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
              premium === "FREE"
                ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
            }`}
          >
            {premium === "FREE" ? (
              <>
                <span>✅</span> Free
              </>
            ) : (
              <>
                <span>👑</span> Premium
              </>
            )}
          </span>
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col justify-between h-full">
      <div className="space-y-4">{children}</div>

      {/* Action Bar */}
      <div className="mt-6 flex justify-end">
        <button className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium text-sm shadow hover:bg-blue-700 hover:shadow-md transition">
          View Details →
        </button>
      </div>
    </div>
  </div>
);
