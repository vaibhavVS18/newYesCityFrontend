// Component version of CategoryWishlistPage
'use client';

import { useState, useEffect } from 'react';
import WishlistItem from '@/components/wishlist/WishlistItem';
import Loading from '@/components/wishlist/Loading';
import { CategoryType } from '@/constants/categories';

interface WishlistItemType {
  _id: string;
  cityName: string;
  parentRef: string;
  onModel: CategoryType;
  data: any;
}

interface ApiResponse {
  success: boolean;
  wishlist: WishlistItemType[];
}

interface CategoryWishlistProps {
  cityName: string;
  category: CategoryType | 'all';
}

export default function CategoryWishlistComponent({ cityName, category }: CategoryWishlistProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchWishlistItems();
  }, [cityName, category]);

  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      
      // Different API endpoints based on category
      const apiUrl = category === 'all' 
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist/${encodeURIComponent(cityName)}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist/${encodeURIComponent(cityName)}/${category}`;
      
      const res = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch wishlist items');
      }

      const data: ApiResponse = await res.json();
      
      if (data.success) {
        setWishlistItems(data.wishlist);
      } else {
        setError('Failed to load wishlist items');
      }
    } catch (err) {
      setError('Error fetching wishlist items');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string, onModel: string, parentRef: string, cityName: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ onModel, parentRef, cityName }),
        }
      );

      if (res.ok) {
        setWishlistItems((prev) => prev.filter((item) => item._id !== itemId));
      } else {
        const errText = await res.text();
        throw new Error(`Failed to remove item: ${errText}`);
      }
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item from wishlist");
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchWishlistItems}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            {category === 'all' ? '💝' : '📂'}
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {category === 'all' ? 'No items in wishlist' : `No ${category} items`}
          </h3>
          <p className="text-gray-500">
            {category === 'all' 
              ? `No wishlist items found for ${cityName}`
              : `No ${category} items found in your ${cityName} wishlist`
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <a
              key={item._id}
              href={`/city/${encodeURIComponent(cityName)}/${encodeURIComponent(item.onModel)}/${encodeURIComponent(item.parentRef)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <WishlistItem
                {...item}
                onRemove={handleRemoveItem}
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}