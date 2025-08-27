'use client';

import { useState, useEffect } from 'react';
import CityCard from '@/components/wishlist/CityCard';
import Loading from '@/components/wishlist/Loading';

interface City {
  _id: string;
  cityName: string;
  'cover-image': string;
  content: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  cities: City[];
}

export default function WishlistPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/wishlist`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch cities');
      }

      const data: ApiResponse = await res.json();
      
      if (data.success) {
        setCities(data.cities);
      } else {
        setError('Failed to load wishlist cities');
      }
    } catch (err) {
      setError('Error fetching wishlist cities');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={fetchCities}
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          {cities.length === 0 
            ? 'No cities in your wishlist yet' 
            : `You have items from ${cities.length} ${cities.length === 1 ? 'city' : 'cities'}`
          }
        </p>
      </div>

      {cities.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No cities in wishlist</h3>
          <p className="text-gray-500">Start exploring and add places to your wishlist!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <CityCard key={city._id} {...city} />
          ))}
        </div>
      )}
    </div>
  );
}