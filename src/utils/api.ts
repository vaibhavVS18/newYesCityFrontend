// utils/api.ts
// utils/api.ts
import { ApiResponse, CategoryType } from '@/types';

export const fetchCategoryData = async (
  cityName: string, 
  category: CategoryType, 
  page: number = 1
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/city/${encodeURIComponent(cityName)}/${category}?page=${page}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // ✅ Check for Unauthorized
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/signup';
      }
      throw new Error('Unauthorized: Redirecting to signup');
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} data (status: ${response.status})`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${category} data:`, error);
    throw error;
  }
};


export const searchCategory = (searchTerm: string): CategoryType | null => {
  const categories: CategoryType[] = [
    'Accommodation',
    'Activity',
    'CityInfo',
    'Connectivity', 
    'Food',
    'HiddenGem',
    'Itinerary',
    'Misc',
    'NearbySpot',
    'Place',
    'Shop',
    'Transport'
  ];

  const foundCategory = categories.find(category => 
    category.toLowerCase() === searchTerm.toLowerCase()
  );

  return foundCategory || null;
};