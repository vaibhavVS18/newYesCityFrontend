// app/chatbot/[cityName]/page.tsx
'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import CategorySidebar from '@/components/chatbot/CategorySidebar';
import ChatBox from '@/components/chatbot/ChatBox';
import SearchBox from '@/components/chatbot/SearchBox';
import { useChatbot } from '@/hooks/useChatbot';

export default function ChatbotPage() {
  const params = useParams();
  const cityName = params.cityName as string;
  
  const {
    messages,
    loading,
    error,
    initializeCityInfo,
    selectCategory,
    loadMore,
    handleSearch,
    clearError
  } = useChatbot(decodeURIComponent(cityName));

  // Auto-fetch CityInfo when component mounts
  useEffect(() => {
    initializeCityInfo();
  }, [initializeCityInfo]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Travel Assistant - {decodeURIComponent(cityName)}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Explore categories or search for specific information
        </p>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Categories */}
        <CategorySidebar 
          onSelectCategory={selectCategory}
          loading={loading}
        />

        {/* Right Content - Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <ChatBox
            messages={messages}
            loading={loading}
            error={error}
            onLoadMore={loadMore}
            onClearError={clearError}
            onSelectCategory={selectCategory} // Pass selectCategory to ChatBox
          />

          {/* Search Box */}
          <SearchBox
            onSearch={handleSearch}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}