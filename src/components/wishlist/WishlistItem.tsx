import { useState } from 'react';
import { CategoryType } from '@/constants/categories';

interface WishlistItemData {
  _id: string;
  cityName: string;
  images?: string[];
  premium: string;
  // Accommodation
  flagship?: boolean;
  hotels?: string;
  roomTypes?: string;
  // Activity
  topActivities?: string;
  // CityInfo
  stateOrUT?: string;
  alternateNames?: string;
  coverImage?: string;
  // Connectivity
  nearestAirportStationBusStand?: string;
  distance?: string;
  // Food
  foodPlace?: string;
  vegOrNonVeg?: string;
  menuSpecial?: string;
  // HiddenGem
  hiddenGem?: string;
  // Itinerary
  day1?: string;
  day2?: string;
  day3?: string;
  // Misc
  hospital?: string;
  Police?: string;
  parking?: string;
  publicWashrooms?: string;
  locker?: string;
  // NearbySpot & Place
  places?: string;
  establishYear?: string;
  description?: string;
  // Shop
  shops?: string;
  famousFor?: string;
  // Transport
  from?: string;
  to?: string;
}

interface WishlistItemProps {
  _id: string;
  cityName: string;
  parentRef: string;
  onModel: CategoryType;
  data: WishlistItemData;
  onRemove?: (itemId: string, onModel: string, parentRef: string, cityName: string) => Promise<void> | void;
}

export default function WishlistItem({ _id, cityName, parentRef, onModel, data, onRemove }: WishlistItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    if (!onRemove) return;
    
    setIsRemoving(true);
    try {
      onRemove(_id, onModel, parentRef, cityName);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  const getTitle = () => {
    switch (onModel) {
      case 'Accommodation':
        return data.hotels || 'Hotel';
      case 'Activity':
        return data.topActivities || 'Activity';
      case 'Food':
        return data.foodPlace || 'Restaurant';
      case 'HiddenGem':
        return data.hiddenGem || 'Hidden Gem';
      case 'Place':
      case 'NearbySpot':
        return data.places || 'Place';
      case 'Shop':
        return data.shops || 'Shop';
      default:
        return onModel;
    }
  };

  const getDescription = () => {
    switch (onModel) {
      case 'Accommodation':
        return data.roomTypes;
      case 'Activity':
        return `Activity in ${cityName}`;
      case 'Food':
        return `${data.vegOrNonVeg || ''} ${data.menuSpecial || ''}`.trim();
      default:
        return data.description || `${onModel} in ${cityName}`;
    }
  };

  const primaryImage = data.images?.[0] || data.coverImage || '/placeholder-image.jpg';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={primaryImage}
          alt={getTitle()}
          className="w-full h-full object-cover"
        />
        {data.premium === 'PREMIUM' && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            PREMIUM
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{getTitle()}</h3>
            {onRemove && (
            <button
                onClick={(e) => {
                e.stopPropagation();   // 🚫 prevent card <a> click
                e.preventDefault();    // 🚫 prevent navigation
                handleRemove();
                }}
                disabled={isRemoving}
                className="text-red-500 hover:text-red-700 p-1 disabled:opacity-50"
                title="Remove from wishlist"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
            </button>
            )}
        </div>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{getDescription()}</p>
        
        <div className="flex justify-between items-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {onModel}
          </span>
          <span className="text-gray-500 text-xs">{cityName}</span>
        </div>
      </div>
    </div>
  );
}

