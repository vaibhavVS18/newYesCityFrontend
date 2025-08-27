// hooks/useChatbot.ts
import { useState, useCallback } from 'react';
import { ChatMessage, CategoryType, CategoryData, ApiResponse } from '@/types';
import { fetchCategoryData, searchCategory } from '@/utils/api';

export const useChatbot = (cityName: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fetch CityInfo on mount
  const initializeCityInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchCategoryData(cityName, 'CityInfo', 1);
      
      const cityInfoMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'cityinfo',
        content: 'City Information',
        data: response.data,
        category: 'CityInfo',
        timestamp: new Date(),
        pagination: response.pagination
      };

      setMessages([cityInfoMessage]);
    } catch (err) {
      setError('Failed to load city information');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cityName]);

  const selectCategory = useCallback(async (category: CategoryType) => {
    try {
      setLoading(true);
      setError(null);

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'category',
        content: `Show me ${category}`,
        category,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);

      // Fetch data
      const response = await fetchCategoryData(cityName, category, 1);
      
      const dataMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'data',
        content: `${category} results`,
        data: response.data,
        category,
        timestamp: new Date(),
        pagination: response.pagination
      };

      setMessages(prev => [...prev, dataMessage]);
    } catch (err) {
      setError(`Failed to fetch ${category} data`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cityName]);

  const loadMore = useCallback(async (messageId: string, category: CategoryType, currentPage: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchCategoryData(cityName, category, currentPage + 1);
      
      setMessages(prev => prev.map(msg => {
        if (msg.id === messageId && msg.data) {
          return {
            ...msg,
            data: [...msg.data, ...response.data],
            pagination: response.pagination
          };
        }
        return msg;
      }));
    } catch (err) {
      setError('Failed to load more items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cityName]);

  const handleSearch = useCallback(async (searchTerm: string) => {
    const category = searchCategory(searchTerm.trim());
    
    if (category) {
      await selectCategory(category);
    } else {
      setError(`"${searchTerm}" is not a valid category. Try: Accommodation, Food, Activity, etc.`);
    }
  }, [selectCategory]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    initializeCityInfo,
    selectCategory,
    loadMore,
    handleSearch,
    clearError
  };
};