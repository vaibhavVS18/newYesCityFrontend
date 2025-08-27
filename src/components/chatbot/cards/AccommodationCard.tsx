'use client';

import React from 'react';
import { CardBase, BaseCardProps } from './shared/CardBase';
import { InfoRow } from './shared/InfoRow';
import { getBadgeColor } from './shared/utils';
import WishlistButton from '@/components/wishlist/WishlistButton'; // import the button

const AccommodationCard: React.FC<BaseCardProps> = ({ 
  data, 
  imageSrc, 
  onImageError, 
  category 
}) => {
  const accommodation = data as any;
  
  return (
    <CardBase 
      imageSrc={imageSrc} 
      onImageError={onImageError} 
      category={category} 
      premium={data.premium}
    >
      {/* Wishlist Button */}
      {accommodation._id && accommodation.cityName && (
        <WishlistButton
          onModel="Accommodation"
          parentRef={accommodation._id}
          cityName={accommodation.cityName}
        />
      )}

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-xl text-gray-900 leading-tight flex-1">
            {accommodation.hotels}
          </h3>
          {accommodation.flagship && (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getBadgeColor('flagship')} ml-2 flex-shrink-0`}>
              ⭐ Flagship
            </span>
          )}
        </div>
        
        <div className="space-y-3">
          <InfoRow 
            icon="🏨" 
            label="Room Types" 
            value={accommodation.roomTypes} 
          />
          {accommodation.amenities && (
            <InfoRow 
              icon="✨" 
              label="Amenities" 
              value={accommodation.amenities} 
            />
          )}
          {accommodation.rating && (
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="text-gray-800 font-semibold">{accommodation.rating}</span>
              <span className="text-gray-500 text-sm">rating</span>
            </div>
          )}
        </div>
      </div>
    </CardBase>
  );
};

export default AccommodationCard;
