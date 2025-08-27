// components/chatbot/ChatBox.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatMessage, CategoryType } from '@/types';
import DataCard from './DataCard';

interface ChatBoxProps {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  onLoadMore: (messageId: string, category: CategoryType, currentPage: number) => void;
  onClearError: () => void;
  onSelectCategory: (category: CategoryType) => void; // Add this prop
}

const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  loading,
  error,
  onLoadMore,
  onClearError,
  onSelectCategory
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-scroll when loading state changes
  useEffect(() => {
    if (loading) {
      scrollToBottom();
    }
  }, [loading]);

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const category = e.dataTransfer.getData('text/plain') as CategoryType;
    if (category && !loading) {
      onSelectCategory(category);
    }
  };

  const renderMessage = (message: ChatMessage) => {
    switch (message.type) {
      case 'category':
        return (
          <div className="flex justify-end mb-4">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg max-w-xs">
              {message.content}
            </div>
          </div>
        );

      case 'cityinfo':
      case 'data':
        return (
          <div className="flex justify-start mb-6">
            <div className="bg-gray-100 p-4 rounded-lg max-w-full w-full">
              <p className="text-gray-700 font-medium mb-4">{message.content}</p>
              
              {/* Cards Grid */}
              {message.data && message.data.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {message.data.map((item, index) => (
                    <DataCard
                      key={`${item._id}-${index}`}
                      data={item}
                      category={message.category || ''}
                    />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {message.pagination && 
               message.pagination.page < message.pagination.totalPages && 
               message.category && (
                <div className="text-center">
                  <button
                    onClick={() => onLoadMore(
                      message.id, 
                      message.category as CategoryType, 
                      message.pagination!.page
                    )}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 
                             text-white px-6 py-2 rounded-lg transition-colors duration-200
                             disabled:cursor-not-allowed"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Showing {message.data?.length || 0} of {message.pagination.total} items
                  </p>
                </div>
              )}

              {/* No more items message */}
              {message.pagination && 
               message.pagination.page >= message.pagination.totalPages && 
               message.pagination.total > 0 && (
                <p className="text-center text-gray-500 text-sm">
                  All items loaded ({message.pagination.total} total)
                </p>
              )}
            </div>
          </div>
        );

      case 'user':
        return (
          <div className="flex justify-end mb-4">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg max-w-xs">
              {message.content}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="flex-1 flex flex-col bg-white min-h-0 relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drop Zone Overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-100 bg-opacity-90 z-10 flex items-center justify-center border-2 border-dashed border-blue-400 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">📂</div>
            <p className="text-xl font-semibold text-blue-700 mb-2">Drop category here!</p>
            <p className="text-blue-600">Release to explore this category</p>
          </div>
        </div>
      )}

      {/* Chat Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 min-h-0"
        style={{ 
          maxHeight: '100%',
          scrollBehavior: 'smooth' 
        }}
      >
        {messages.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">Welcome! Select a category to get started.</p>
            <p className="text-sm mt-2">Choose from the categories on the left, drag them here, or search below.</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id}>
            {renderMessage(message)}
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={onClearError}
                className="text-red-700 hover:text-red-900 font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Optional: Scroll to bottom button for manual control */}
      <div className="absolute bottom-20 right-6">
        <button
          onClick={scrollToBottom}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg opacity-75 hover:opacity-100 transition-opacity duration-200"
          title="Scroll to bottom"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;