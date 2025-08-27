'use client';

import React from 'react';

export const InfoRow: React.FC<{
  icon: string;
  label: string;
  value: string;
  className?: string;
}> = ({ icon, label, value, className = "" }) => (
  <div className={`flex items-start gap-3 ${className}`}>
    <span className="text-blue-500 text-lg flex-shrink-0 mt-0.5">{icon}</span>
    <div className="flex-1 min-w-0">
      <span className="text-gray-600 text-sm font-medium">{label}:</span>
      <p className="text-gray-800 text-sm mt-0.5 break-words">{value}</p>
    </div>
  </div>
);