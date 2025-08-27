'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CategoryTabs from '@/components/wishlist/CategoryTabs';
import CategoryWishlistComponent from '@/components/wishlist/CategoryWishlistComponent';
import { CategoryType } from '@/constants/categories';

interface WishlistItemType {
  _id: string;
  cityName: string;
  parentRef: string;
  onModel: CategoryType;
  data: any;
}

export default function CityWishlistPage() {
  const params = useParams();
  const cityName = decodeURIComponent(params.cityName as string);
  
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');
  const [totalCount, setTotalCount] = useState(0);

  // Fetch total count for header display
  useEffect(() => {
    fetchTotalCount();
  }, [cityName]);

  const fetchTotalCount = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist/${encodeURIComponent(cityName)}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTotalCount(data.wishlist.length);
        }
      }
    } catch (err) {
      console.error('Error fetching total count:', err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {cityName} {activeCategory !== 'all' ? `- ${activeCategory}` : 'Wishlist'}
          </h1>
          <p className="text-gray-600 mt-1">
            {activeCategory === 'all' 
              ? `${totalCount} ${totalCount === 1 ? 'item' : 'items'} in your wishlist`
              : `Showing ${activeCategory} items`
            }
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs 
        cityName={cityName} 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Content - Reusable Component */}
      <CategoryWishlistComponent 
        cityName={cityName}
        category={activeCategory}
      />
    </div>
  );
}