// components/chatbot/CategorySidebar.tsx
'use client';

import { useState } from 'react';
import { CategoryType, CATEGORIES } from '@/types';

interface CategorySidebarProps {
  onSelectCategory: (category: CategoryType) => void;
  loading: boolean;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ 
  onSelectCategory, 
  loading 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, category: CategoryType) => {
    e.dataTransfer.setData('text/plain', category);
    e.dataTransfer.effectAllowed = 'copy';
    
    // Add visual feedback
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLButtonElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-80'} bg-gray-50 border-r border-gray-200 h-full overflow-y-auto transition-all duration-300 ease-in-out relative`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
        title={isCollapsed ? "Expand categories" : "Collapse categories"}
      >
        <svg 
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7" 
          />
        </svg>
      </button>

      <div className="p-4">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-gray-800 mb-4 pr-12">
            Categories
          </h2>
        )}
        
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              onDragStart={(e) => handleDragStart(e, category)}
              onDragEnd={handleDragEnd}
              draggable={!loading}
              disabled={loading}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 
                         bg-white hover:bg-blue-50 border border-gray-200 
                         hover:border-blue-300 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                         group cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? category : undefined}
            >
              {isCollapsed ? (
                <div className="flex justify-center">
                  <span className="text-gray-700 group-hover:text-blue-700 font-medium text-sm">
                    {category.charAt(0)}
                  </span>
                </div>
              ) : (
                <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                  {category}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Drag instructions */}
        {!isCollapsed && !loading && (
          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              💡 <strong>Tip:</strong> You can drag category buttons to the chat area or click them directly!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;